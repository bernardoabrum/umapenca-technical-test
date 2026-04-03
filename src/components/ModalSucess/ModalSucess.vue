<template>
  <div class="cmp-modal-sucess">
    <div class="modal-container">
      <div class="close-button">
        <button @click="emit('close')">
          <FontAwesomeIcon :icon="faXmark" />
        </button>
      </div>
      <h1 class="title">Pedido realizado com sucesso!</h1>
      <h2 class="subtitle">Verifique o console para obter as informações</h2>
      <FontAwesomeIcon class="icon" :icon="faCircleCheck" />
    </div>
  </div>
</template>

<script setup>
import "./ModalSucess.less";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const emit = defineEmits(["close"]);
</script>
