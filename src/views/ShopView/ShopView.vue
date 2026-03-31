<template>
  <div class="view shop-view">
    <h1 class="view-title">Camisetas</h1>
    <button class="add-product" @click="showAddModal = true">
      Adicionar produtos
    </button>
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
    <AddModal
      v-if="showAddModal"
      @close="showAddModal = false"
      @add-product="fetchProducts"
    />
  </div>
</template>

<script setup>
import "./ShopView.less";
import { onMounted, ref } from "vue";
import { Product, AddModal } from "@/components";
import axios from "axios";
import { faker } from "@faker-js/faker";

const products = ref([]);
const showAddModal = ref(false);

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
