<template>
  <div :class="['cmp-sidebar', { hide: !showSidebar }]">
    <h1 class="title">Filtros</h1>
    <div class="close-button">
      <button @click="showSidebar = !showSidebar">
        <FontAwesomeIcon :icon="faBars" />
      </button>
    </div>
    <div class="input-search">
      <p>Buscar produto</p>
      <Input
        input-name="search"
        input-type="text"
        placeholder="Digite o nome do produto"
        v-model="name"
      />
    </div>
    <div class="input-price">
      <p>
        Preço até: <span>R$ {{ price }}</span>
      </p>
      <input
        type="range"
        min="0"
        max="200"
        step="1"
        v-model="price"
        class="range"
      />
    </div>
    <Button class="send" button-text="Enviar" @click="handleFilter" />
  </div>
</template>

<script setup>
import "./Sidebar.less";
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Input, Button } from "@/components";

const emit = defineEmits(["filter"]);

const showSidebar = ref(true);
const name = ref("");
const price = ref(200);

const handleFilter = () => {
  emit("filter", {
    name: name.value.trim(),
    price: price.value,
  });
};
</script>
