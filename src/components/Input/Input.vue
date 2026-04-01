<template>
  <div class="cmp-input">
    <input
      :name="inputName"
      :type="inputType"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
    />
  </div>
</template>

<script setup>
import "./Input.less";

const emit = defineEmits(["update:modelValue"]);

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
});
</script>
