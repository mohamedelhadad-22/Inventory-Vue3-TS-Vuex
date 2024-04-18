<!-- // ProductPage.vue
<template>
  <div>
    <h1>Product Page</h1>
    <p>Product ID: {{ $route.params.id }}</p>
    <p>{{ item.id }}</p>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "UnitsDetails",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    // const products = ref([]);

    // onMounted(async () => {
    //   // Fetch products when the component is mounted
    //   await store.dispatch("fetchProducts");
    //   // Get products from the store after fetching
    //   products.value = store.getters.allProducts;
    // });

    // return {
    //   products,
    // };
  },
};
</script> -->
