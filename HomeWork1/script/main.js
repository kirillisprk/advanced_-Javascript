"use strict";
const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (product) => {
    let num = new Date().getTime();
    return `<div class="product-item" data-id="${product.id}" >
                <img src="https://picsum.photos/200/200?random=${num}" alt="random">
                <h3 class="product-item__name">${product.title}</h3>
                <p class="product-item__prise">${product.price} руб.</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').insertAdjacentHTML('afterbegin', productsList.join(''));
};

renderPage(products);