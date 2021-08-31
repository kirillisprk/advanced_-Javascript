'use strict';
const API = 'localhost:3000';
new Vue({
    el: "#app",
    data: {
        catalogUrl: '/api/products',
        basketUrl: '/api/cart',
        addToBasketUrl: 'addToBasket.json',
        products: [],
        productsFilter: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        filterInput: '',
        showCard: false,
        card: {
            amount: '',
            countGoods: '',
            contents: []
        },
        error: false,
        errorDescriptions: []
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.error = true;
                    this.errorDescriptions.push(`Не удалось преобразовать объект в json Подробно: ${error}`);
                });
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.error = true;
                    this.errorDescriptions.push(`postJson. Подробно: ${error}`);
                });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.error = true;
                    this.errorDescriptions.push(`putJson. Подробно: ${error}`);
                });
        },
        deleteJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.error = true;
                    this.errorDescriptions.push(`deleteJson. Подробно: ${error}`);
                });
        },

        filterProduct() {
            const regexp = new RegExp(this.filterInput, 'i');
            this.productsFilter = this.products.filter(product => {
                return regexp.test(product.product_name);
            });
        },
        addProductCard(item) {
            let find = this.card.contents.find(el => el.id_product === item.id_product);

            if (find) {
                this.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
                    .catch(error => {
                        this.error = true;
                        this.errorDescriptions.push(`Не удалось добавить товар в корзину. Подробно: ${error}`);
                    });
            } else {
                const prod = Object.assign({quantity: 1}, item);//создание нового объекта на основе двух, указанных в параметрах
                this.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            console.log(prod);
                            this.card.contents.push(prod);
                        }
                    })
                    .catch(error => {
                        this.error = true;
                        this.errorDescriptions.push(`Не удалось добавить новый товар в корзину. Подробно: ${error}`);
                    });
            }
        },
        removeProductCard(item) {
            let find = this.card.contents.find(el => el.id_product === item.id_product);
            if (find) {
                this.deleteJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if (data.result === 1) {
                            if (find.quantity > 1) {
                                find.quantity--;
                            } else {
                                this.card.contents.splice(this.card.contents.indexOf(find), 1);
                            }

                        }
                    })
                    .catch(error => {
                        this.error = true;
                        this.errorDescriptions.push(`Не удалось удалить товар из корзины. Подробно: ${error}`);
                    });

            }
        },
    },
    computed: {
        getTotalPriceProductCard() {
            const arr = [];
            this.card.contents.forEach(el => {
                arr.push(el.price * el.quantity);
            });
            return this.card.amount = arr.reduce((a, b) => {
                return a + b;
            }, 0)
        },
        getCountProductCard() {
            const arr = [];
            this.card.contents.forEach(el => {
                arr.push(el.quantity);
            });
            return this.card.countGoods = arr.reduce((a, b) => {
                return a + b;
            }, 0);
        }
    },
    mounted() {
        this.getJson(this.catalogUrl)
            .then(data => {
                for (let el of data) {
                    el.pathImg = `./img/product/${el.id_product}.png`
                    this.products.push(el);
                    this.productsFilter.push(el);
                }
            })
            .catch(error => {
                this.error = true;
                this.errorDescriptions.push(`Не удалось получить товары (${API + this.catalogUrl}). Подробно: ${error}`);
            });

        this.getJson(this.basketUrl)
            .then(data => {
                this.card.amount = data.amount;
                this.card.countGoods = data.countGoods;
                if (data.contents !== 0) {
                    data.contents.forEach(element => {
                        this.card.contents.push(element);
                    });
                } else {
                    this.card.contents = [];
                }

            })
            .catch(error => {
                this.error = true;
                this.errorDescriptions.push(`Не удалось получить содержимого корзины (${API + this.basketUrl}). Подробно: ${error}`);
            });
    }
});