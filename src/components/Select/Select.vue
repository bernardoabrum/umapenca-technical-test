<template>
  <div class="cmp-select">
    <select
      :name="selectName"
      @change="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      :class="{ placeholder: !modelValue }"
    >
      <option
        :value="option.value"
        :key="option.value"
        :disabled="option.disabled"
        v-for="option in selectOptions"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import "./Select.less";

const emit = defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  selectName: {
    type: String,
    required: true,
  },
  selectOptions: {
    type: Array,
    required: true,
  },
});
</script>
