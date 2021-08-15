'use strict';
Vue.component('products', {
    props: ['products', 'img'],
    template: `
      <div>
      <h1 class="text-cart" v-show="products.length===0">Товары отсутствуют</h1>
      <div class="products">
        <product
            v-for="product of products"
            :key="products.id_product"
            :img="product.pathImg"
            :product="product">
        </product>
      </div>
      </div>`
});
//без регистрации события @click="$root.addProductCard(product)"
Vue.component('product', {
    props: ['img', 'product'],
    template: `
      <div class="product-item">
      <div class="box-img">
        <img :src="img" alt="Some img" class="product-item-img">
        <button class="buy-btn"
                @click="$parent.$emit('add-product',product)">
          <i class="fas fa-cart-plus"></i>
          Купить
        </button>
      </div>
      <div class="product-item-info">
        <h3 class="product-item__name">
          {{ product.product_name }}
        </h3>
        <p class="product-item__prise">
          {{ product.price }} руб.
        </p>
      </div>
      </div>
    `
})