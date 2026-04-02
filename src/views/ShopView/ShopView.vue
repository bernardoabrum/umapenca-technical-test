<template>
  <div class="view shop-view">
    <Header @toggle-sidebar="handleToggleSidebar" />
    <Sidebar @filter="handleFilter" :show-sidebar="showSidebar" />
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
        v-for="product in filteredProducts"
        :key="product.id"
        :imageSrc="product.image"
        :productName="product.title"
        :productDescription="product.description"
        :productPrice="product.price"
        @buy-this-item="addItemToCart(product)"
        :button-loading="buttonLoading === product.id"
      />
    </div>
    <AddModal
      v-if="showAddModal"
      @close="showAddModal = false"
      @add-product="fetchProducts(route.params.category)"
    />
  </div>
</template>

<script setup>
import "./ShopView.less";
import { ref, computed, watchEffect } from "vue";
import {
  Product,
  AddModal,
  Button,
  Select,
  Sidebar,
  Header,
} from "@/components";
import axios from "axios";
import { faker } from "@faker-js/faker";
import router from "@/router";
import { useRoute } from "vue-router";
import { useStore } from "@/store";

const route = useRoute();
const { addToCart } = useStore();

const products = ref([]);
const showAddModal = ref(false);
const showSidebar = ref(false);
const buttonLoading = ref(false);
const categoryOptions = [
  { value: "all", label: "Todos os produtos" },
  { value: "tshirt", label: "Camisetas" },
  { value: "mug", label: "Canecas" },
  { value: "ecobag", label: "Ecobags" },
];
const filters = ref({
  name: "",
  price: 200,
});

const selectedCategory = computed({
  get: () => route.params.category || "all",
  set: (value) => {
    if (value === "all") {
      router.push("/shop");
    } else {
      router.push(`/shop/${value}`);
    }
  },
});

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesName = product.title
      .toLowerCase()
      .includes(filters.value.name.toLowerCase());

    const matchesPrice = product.price <= filters.value.price;

    return matchesName && matchesPrice;
  });
});

const fetchProducts = async (category) => {
  try {
    const response = await axios.get(
      !category
        ? "http://localhost:3000/products"
        : `http://localhost:3000/products?category=${category}`,
    );

    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const handleFilter = ({ name, price }) => {
  filters.value.name = name;
  filters.value.price = price;
};

const handleToggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

const addItemToCart = (product) => {
  addToCart(product);
  buttonLoading.value = product.id;
  setTimeout(() => {
    buttonLoading.value = false;
    alert("Produto adicionado ao carrinho!");
  }, 500);
};

watchEffect(() => {
  fetchProducts(route.params.category);
});
</script>
