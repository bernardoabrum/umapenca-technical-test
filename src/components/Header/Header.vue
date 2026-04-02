<template>
  <div class="cmp-header">
    <div class="menu-button">
      <button @click="emit('toggle-sidebar')">
        <FontAwesomeIcon :icon="faBars" />
      </button>
    </div>
    <button class="cart-button" @click="router.push('/cart')">
      <span>Ir para o carrinho</span>
      <FontAwesomeIcon :icon="faCartArrowDown" />
    </button>
  </div>
</template>

<script setup>
import "./Header.less";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "vue-router";

const router = useRouter();

const emit = defineEmits(["toggle-sidebar"]);
</script>
