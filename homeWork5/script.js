'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: 'catalogData.json',
        basketUrl: 'getBasket.json',
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
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(`Ошибка обращения к данным: ${error}`);
                })
        },
        filterProduct() {
            const regexp = new RegExp(this.filterInput, 'i');
            this.productsFilter = this.products.filter(product => {
                return regexp.test(product.product_name);
            });
        },
        addProductCard(item) {
            this.getJson(`${API + this.addToBasketUrl}`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.card.contents.find(el => el.id_product === item.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            const prod = Object.assign({quantity: 1}, item);//создание нового объекта на основе двух, указанных в параметрах
                            this.card.contents.push(prod)
                        }
                    }
                })
                .catch(error => console.log(`Ошибка добавления товара: ${error}`));
        },
        removeProductCard(item) {
            this.getJson(`${API + this.addToBasketUrl}`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.card.contents.splice(this.card.contents.indexOf(item), 1);
                        }
                    }
                })
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
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.productsFilter.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.productsFilter.push(el);
                }
            });
        this.getJson(`${API + this.basketUrl}`)
            .then(data => {
                this.card.amount = data.amount;
                this.card.countGoods = data.countGoods;
                data.contents.forEach(element => {
                    this.card.contents.push(element);
                });
            });
    }

});