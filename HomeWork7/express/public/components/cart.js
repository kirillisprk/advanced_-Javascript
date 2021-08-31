'use strict';
Vue.component('cart', {
    props: ['show', 'cards'],
    template: `
      <transition name="fade">
      <div class="basket" v-show="show">
        <h3 class="text-card" v-show="cards.contents.length===0">Товары отсутствуют</h3>
        <div class="product-card">
          <div v-for="productCard of cards.contents"
               :key="productCard.id_product">
            <cart-item
                :productCard="productCard">
            </cart-item>
            <div class="hr-style"></div>
          </div>
        </div>
        <div class="text-card" v-show="cards.contents.length>0">
          <p>Итого:</p>
          <p> {{ $root.getTotalPriceProductCard }} руб.</p>
        </div>
      </div>
      </transition>
    `
});
Vue.component('cart-item', {
    props: ['productCard'],
    template: `
      <div class="basket__item">
      <img :src="productCard.pathImg" alt="Some img" class="product-cart-img">
      <div class="basket__item-info">
        <p class="product-item__name">{{ productCard.product_name }}</p>
        <div class="product-item-total">
          <p class="product-item__quantity">{{ productCard.quantity }}</p>
          <p class="product-item-total__divider">x</p>
          <p class="product-item__price-cart">{{ productCard.price * productCard.quantity }} руб.</p>
        </div>
      </div>
      <button class="remove-btn" @click="$root.removeProductCard(productCard)">
        <i class="fas fa-minus-circle"></i>
      </button>
      </div>
    `
});
