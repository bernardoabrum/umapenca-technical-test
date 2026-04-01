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
        <Input
          input-name="title"
          input-type="text"
          placeholder="Nome do produto"
          v-model="name"
          maxlength="30"
        />
        <textarea
          name="description"
          placeholder="Descrição do produto"
          v-model="description"
          maxlength="120"
        />
        <Select
          select-name="category"
          :select-options="categoryOptions"
          v-model="selectedCategory"
        />
        <Input
          input-name="price"
          ref="inputRef"
          placeholder="Preço do produto"
          maxlength="20"
        />
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
import { Button, Input, Select } from "@/components";

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
const selectedCategory = ref("");

const categoryOptions = [
  { value: "", label: "Selecione a categoria", disabled: true },
  { value: "tshirt", label: "Camiseta" },
  { value: "mug", label: "Caneca" },
  { value: "ecobag", label: "Ecobag" },
];

const handleSubmit = async () => {
  if (
    !name.value ||
    !description.value ||
    numberValue.value === null ||
    !selectedCategory.value
  ) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const newProduct = {
    title: name.value.trim(),
    description: description.value.trim(),
    price: numberValue.value,
    category: selectedCategory.value,
  };

  try {
    await axios.post("http://localhost:3000/products", newProduct);
    emit("addProduct");
    isLoading.value = true;

    name.value = "";
    description.value = "";
    setValue(null);
    selectedCategory.value = "";

    setTimeout(() => {
      emit("close");
    }, 1000);
  } catch (error) {
    console.error("Error adding product:", error);
  }
};
</script>
