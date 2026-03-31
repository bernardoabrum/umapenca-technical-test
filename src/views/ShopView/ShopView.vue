<template>
  <div class="view shop-view">
    <h1 class="title">Camisetas</h1>
    <div class="products-container">
      <Product
        v-for="product in products"
        :key="product.id"
        :imageSrc="product.image"
        :productName="product.title"
        :productDescription="product.description"
        :productPrice="product.price"
      />
    </div>
  </div>
</template>

<script setup>
import "./ShopView.less";
import { onMounted, ref } from "vue";
import { Product } from "@/components";
import axios from "axios";
import { faker } from "@faker-js/faker";

const products = ref([]);

onMounted(() => {
  fetchProducts();
});

const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");

    products.value = response.data.map((product) => ({
      ...product,
      image: faker.image.url(),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
</script>
