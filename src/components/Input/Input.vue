<template>
  <div :class="['cmp-input', { invalid: isEmpty }, { isValid }]">
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
      @blur="handleBlur"
      @maska="handleMask"
    />
    <p class="error-message">Este campo não pode ser vazio!</p>
  </div>
</template>

<script setup>
import "./Input.less";
import { vMaska } from "maska/vue";
import { ref } from "vue";

const emit = defineEmits(["update:modelValue", "blur", "validate"]);
const maskCompleted = ref(false);

const props = defineProps({
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
  isValid: {
    type: Boolean,
    default: null,
  },
});

const handleMask = (e) => {
  maskCompleted.value = e.detail.completed;
};

const handleBlur = (e) => {
  const value = e.target.value;

  let valid;

  if (props.inputMask) {
    valid = maskCompleted.value;
  } else {
    valid = value.trim().length > 0;
  }

  emit("validate", valid);
  emit("blur", value);
};
</script>
