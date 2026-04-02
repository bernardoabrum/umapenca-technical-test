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
      <div class="container-buy">
        <p class="price">{{ formatPrice(productPrice) }}</p>
        <Button
          @click="emit('buy-this-item')"
          button-text="Comprar"
          :is-loading="buttonLoading"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import "./Product.less";
import { Button } from "@/components";

const emit = defineEmits(["buy-this-item"]);

defineProps({
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
  buttonLoading: {
    type: Boolean,
    default: false,
  },
});

const formatPrice = (value) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
</script>
