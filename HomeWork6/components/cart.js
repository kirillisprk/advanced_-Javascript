'use strict';
Vue.component('cart', {
    props: ['show', 'cards'],
    template: `
      <transition name="fade">
      <div class="basket" v-show="show">
        <h3 class="text-card" v-show="cards.contents.length===0">Товары отсутствуют</h3>
        <div v-for="productCard of cards.contents"
             :key="productCard.id_product">
          <cart-item
              :productCard="productCard">
          </cart-item>
        </div>
        <h3 class="text-card" v-show="cards.contents.length>0">
          Общая стоимость: {{ $root.getTotalPriceProductCard }} руб.
        </h3>
      </div>
      </transition>
    `
});
Vue.component('cart-item', {
    props: ['productCard'],
    template: `
      <div class="basket__item">
      <p class="product-item__name">{{ productCard.product_name }}</p>
      <p class="product-item__quantity">{{ productCard.quantity }}</p>
      <p class="product-item__prise">{{ productCard.price * productCard.quantity }} руб.</p>
      <button class="remove-btn" @click="$root.removeProductCard(productCard)">
        <i class="fas fa-minus-circle"></i>
      </button>
      </div>


    `
});
