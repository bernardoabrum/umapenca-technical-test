<template>
  <div class="cmp-add-modal">
    <div class="modal-container">
      <div class="close-button">
        <button @click="emit('close')">
          <FontAwesomeIcon :icon="faXmark" />
        </button>
      </div>
      <h1 class="title">Adicionar novo produto</h1>
      <div class="inputs">
        <input
          type="text"
          placeholder="Nome do produto"
          v-model="name"
          maxlength="30"
        />
        <textarea
          placeholder="Descrição do produto"
          v-model="description"
          maxlength="120"
        />
        <input ref="inputRef" placeholder="Preço do produto" />
      </div>
      <Button
        button-text="Enviar"
        @click="handleSubmit"
        :is-loading="isLoading"
      />
    </div>
  </div>
</template>

<script setup>
import "./AddModal.less";
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useCurrencyInput } from "vue-currency-input";
import axios from "axios";
import { Button } from "@/components";

const emit = defineEmits([
  "close",
  "addProduct",
  "update:modelValue",
  "change",
]);

const name = ref("");
const description = ref("");
const { inputRef, numberValue, setValue } = useCurrencyInput({
  locale: "pt-BR",
  currency: "BRL",
  precision: 2,
  autoDecimalDigits: true,
});
const isLoading = ref(false);

const handleSubmit = async () => {
  if (!name.value || !description.value || numberValue.value === null) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const newProduct = {
    title: name.value,
    description: description.value,
    price: numberValue.value,
  };

  try {
    await axios.post("http://localhost:3000/products", newProduct);
    emit("addProduct");
    isLoading.value = true;

    name.value = "";
    description.value = "";
    setValue(null);

    setTimeout(() => {
      emit("close");
    }, 1000);
  } catch (error) {
    console.error("Error adding product:", error);
  }
};
</script>
