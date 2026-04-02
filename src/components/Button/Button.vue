<template>
  <div class="cmp-button">
    <button @click="hasClicked" :class="{ 'is-loading': isLoading }">
      <span class="icon"><FontAwesomeIcon :icon="faCircleNotch" /></span>
      <span class="text">{{ buttonText }}</span>
    </button>
  </div>
</template>

<script setup>
import "./Button.less";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const emit = defineEmits(["click"]);

defineProps({
  buttonText: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const hasClicked = () => {
  emit("click");
};
</script>
