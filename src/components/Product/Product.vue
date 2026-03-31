<template>
  <div class="cmp-product">
    <div class="container-image">
      <img :src="props.imageSrc" :alt="props.productName" />
    </div>
    <div class="container-text">
      <div class="infos">
        <h1 class="title">{{ props.productName }}</h1>
        <h2 class="description">
          {{ props.productDescription }}
        </h2>
      </div>
      <p class="price">R${{ props.productPrice }}</p>
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
</script>
