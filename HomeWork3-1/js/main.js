const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts().then(r => {
            this.goods = [...r];
            this.render();//вывод товаров на страницу
            console.log(`Сумма всех товаров равна:${this.getSum()}`);
        });

    }

    _fetchProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    /**
     *  Подсчет общей стоимости всех продуктов
     * @return {number} результат суммы всех продуктов
     */
    getSum() {
        let arrayAllProductPrice = [];
        this.goods.forEach(good => {
            arrayAllProductPrice.push(good.price);
        });
        return arrayAllProductPrice.reduce(function (a, b) {
            return a + b;
        }, 0)

    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.product_name = product.product_name;
        this.id_product = product.id_product;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item">
                <img src="${this.img}" alt="this.img">
                <h3 class="product-item__name">${this.product_name}</h3>
                <p class="product-item__prise">${this.price} руб.</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }

}

class ProductItemBasket extends ProductItem {
    constructor(product) {
        super(product, product);
        this.quantity = product.quantity;
    }

    renderItemBasket() {
        return `<div class="basket__item data-id = "${this.id_product}">
                    <p class="product-item__name">${this.product_name}</p>
                    <p class="">${this.quantity}</p>
                    <p class="product-item__prise">${this.price} руб.</p>
                 </div>`
    }
}

class Basket {
    constructor(container = '.basket') {
        this.container = container;
        this.contents = [];
        this._fetchBasket().then(r => {
            this.amount = r.amount;
            this.countGoods = r.countGoods;
            this.contents = [...r.contents];
            this.renderBasket();
        });
    }

    _fetchBasket() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    _getListProductBasket(product) {
        let arrProductItemBasket = product.map(element => {
            return new ProductItemBasket(element);
        });
        return arrProductItemBasket.map(item => item.renderItemBasket(item));
    };

    _renderInfoBasket = () => {
        return `<div class="header_basket">
                <h3>Добавлено ${this.countGoods} продукта</h3>
                <p>На сумму: ${this.amount} руб.</p>
                </div>`
    }

    renderBasket() {
        let htmlInfoBasket = this._renderInfoBasket();
        htmlInfoBasket += this._getListProductBasket(this.contents).join('');
        const block = document.querySelector(this.container);
        block.innerHTML = '';
        block.insertAdjacentHTML("beforeend", htmlInfoBasket);
    }

}


let list = new ProductList();
let buttonBasket = document.querySelector('.header__btn-cart');
buttonBasket.addEventListener('click', () => {

    let basket = new Basket();
})








