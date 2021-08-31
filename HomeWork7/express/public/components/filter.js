'use strict';
Vue.component('filter-comp', {
    template:
        `<form action="#" class="filter">
            <input type="text"
            v-model="$root.filterInput"
            @input="$root.filterProduct"
            class="filter__input"
            placeholder="Поиск">
        </form>`
});