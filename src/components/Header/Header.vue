<template>
  <div class="cmp-header">
    <button @click="emit('toggle-sidebar')">
      <FontAwesomeIcon :icon="faBars" />
    </button>
  </div>
</template>

<script setup>
import "./Header.less";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const emit = defineEmits(["toggle-sidebar"]);
</script>
