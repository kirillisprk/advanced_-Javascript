'use strict';
Vue.component('error-box', {
    template: `
      <div v-show="$root.error">
      <div v-for="descriptionError of $root.errorDescriptions">
        <error-text>
          {{ descriptionError }}
        </error-text>
      </div>
      </div>
    `
})
Vue.component('error-text', {
    template: `
    <div class="error-box">
      <strong>Ошибка!</strong>
      <slot></slot>
    </div>
  `
})