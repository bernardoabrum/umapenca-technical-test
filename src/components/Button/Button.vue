<template>
  <div class="cmp-button">
    <button
      :type="buttonType"
      @click="$emit('click')"
      :class="{ 'is-loading': isLoading }"
    >
      <span class="icon"><FontAwesomeIcon :icon="faCircleNotch" /></span>
      <span class="text">
        <slot>
          {{ buttonText }}
        </slot>
      </span>
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
    required: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  buttonType: {
    type: String,
    required: false,
  },
});
</script>
