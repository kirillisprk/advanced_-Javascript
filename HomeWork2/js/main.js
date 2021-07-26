class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();//вывод товаров на страницу
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
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
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item">
                <img src="${this.img}" alt="this.img">
                <h3 class="product-item__name">${this.title}</h3>
                <p class="product-item__prise">${this.price} руб.</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class CartItem {
    getInfoProduct() {
    };

    removeCart() {
    };

    addCart() {
    };

    renderCartItem() {

    };
}

class Cart extends CartItem {

    getUniqueProductCart() {
    };

    renderCart() {
    };

    getSumProductCart() {
    };

}


let list = new ProductList();
console.log(`Сумма всех товаров равна:${list.getSum()}`);

