<template>
  <div class="shop-view">
    <h1>Camisetas</h1>
    <div class="products-container">
      <Product
        v-for="product in products"
        :key="product.id"
        :imageSrc="product.img"
        :productName="product.name"
        :productDescription="product.description"
        :productPrice="product.price"
      />
    </div>
  </div>
</template>

<script setup>
import "./ShopView.less";
import { Product } from "@/components";
import { faker } from "@faker-js/faker";

const products = [
  {
    id: 1,
    name: "Camiseta 1",
    img: faker.image.url(),
    description: "Camiseta de algodón 100% con un diseño moderno y cómodo.",
    price: 19.99,
  },
  {
    id: 2,
    name: "Camiseta 2",
    img: faker.image.url(),
    description: "Camiseta de algodón 100% con un diseño moderno y cómodo.",
    price: 19.99,
  },
  {
    id: 3,
    name: "Camiseta 3",
    img: faker.image.url(),
    description: "Camiseta de algodón 100% con un diseño moderno y cómodo.",
    price: 19.99,
  },
  {
    id: 4,
    name: "Camiseta 4",
    img: faker.image.url(),
    description: "Camiseta de algodón 100% con un diseño moderno y cómodo.",
    price: 19.99,
  },
  {
    id: 5,
    name: "Camiseta 5",
    img: faker.image.url(),
    description: "Camiseta de algodón 100% con un diseño moderno y cómodo.",
    price: 19.99,
  },
  {
    id: 6,
    name: "Camiseta 6",
    img: faker.image.url(),
    description: "Camiseta de algodón 100% con un diseño moderno y cómodo.",
    price: 19.99,
  },
];
</script>
