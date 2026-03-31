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
      <button class="button-send" @click="handleSubmit">
        <FontAwesomeIcon :icon="faCircleNotch" v-if="isLoading" />
        <span v-else>Enviar</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import "./AddModal.less";
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useCurrencyInput } from "vue-currency-input";
import axios from "axios";

const emit = defineEmits(["close", "update:modelValue", "change"]);
const isLoading = ref(false);
const name = ref("");
const description = ref("");

const { inputRef, numberValue, setValue } = useCurrencyInput({
  locale: "pt-BR",
  currency: "BRL",
  precision: 2,
  autoDecimalDigits: true,
});

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
    isLoading.value = true;

    await axios.post("http://localhost:3000/products", newProduct);

    name.value = "";
    description.value = "";
    setValue(null);

    setTimeout(() => {
      isLoading.value = false;
      emit("close");
    }, 500);
  } catch (error) {
    console.error("Error adding product:", error);
  }
};
</script>
