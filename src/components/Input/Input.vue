<template>
  <div :class="['cmp-input', { invalid: isEmpty }]">
    <label :for="inputName">{{ inputLabel }}</label>
    <input
      :id="inputName"
      :name="inputName"
      :type="inputType"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      v-maska="inputMask"
      :required="required"
      :autocomplete="autocomplete"
      @blur="$emit('blur', $event.target.value)"
    />
    <p class="error-message">Este campo não pode ser vazio!</p>
  </div>
</template>

<script setup>
import "./Input.less";
import { vMaska } from "maska/vue";

const emit = defineEmits(["update:modelValue", "blur"]);

defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  inputName: {
    type: String,
    required: true,
  },
  inputType: {
    type: String,
    required: false,
    default: "text",
  },
  placeholder: {
    type: String,
    required: true,
  },
  maxlength: {
    type: String,
    required: false,
  },
  inputMask: {
    type: String,
    required: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  inputLabel: {
    type: String,
    required: false,
  },
  autocomplete: {
    type: String,
    required: false,
  },
  isEmpty: {
    type: Boolean,
    default: false,
  },
});
</script>
