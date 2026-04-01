<template>
  <div class="view shop-view">
    <Select
      select-name="category"
      :select-options="categoryOptions"
      v-model="selectedCategory"
    />
    <Button
      class="add-product"
      button-text="Adicionar produtos"
      @click="showAddModal = true"
    />
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
import { onMounted, ref, watch } from "vue";
import { Product, AddModal, Button, Select } from "@/components";
import axios from "axios";
import { faker } from "@faker-js/faker";
import router from "@/router";

const products = ref([]);
const showAddModal = ref(false);
const selectedCategory = ref("all");

const categoryOptions = [
  { value: "all", label: "Todos os produtos" },
  { value: "tshirt", label: "Camisetas" },
  { value: "mug", label: "Canecas" },
  { value: "ecobag", label: "Ecobags" },
];

onMounted(() => {
  fetchProducts();
});

watch(
  () => selectedCategory.value,
  (value) => {
    if (value === "all") {
      router.push("/shop");
      return;
    }
    router.push(`/shop/${value}`);
  },
);

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
