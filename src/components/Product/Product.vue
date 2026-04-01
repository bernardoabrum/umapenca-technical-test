<template>
  <div class="cmp-product">
    <div class="container-image">
      <img :src="imageSrc" :alt="productName" />
    </div>
    <div class="container-text">
      <div class="infos">
        <h1 class="title">{{ productName }}</h1>
        <h2 class="description">
          {{ productDescription }}
        </h2>
      </div>
      <p class="price">{{ formatPrice(productPrice) }}</p>
    </div>
  </div>
</template>

<script setup>
import "./Product.less";

const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
});

const formatPrice = (value) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
</script>
