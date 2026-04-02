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
      <span v-if="itemsNumber" class="items-number">{{ itemsNumber }}</span>
    </button>
  </div>
</template>

<script setup>
import "./Header.less";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";

const router = useRouter();

const { getShoppingCart } = useStore();

const itemsNumber = computed(() => {
  return getShoppingCart().reduce((total, item) => {
    return total + item.quantity;
  }, 0);
});

const emit = defineEmits(["toggle-sidebar"]);
</script>
