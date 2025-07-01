<template>
  <div class="border rounded mb-4">
    <button
      @click="open = !open"
      class="w-full text-left px-4 py-2 bg-gray-200 font-semibold"
    >
      {{ title }}
    </button>
    <div v-if="open" class="p-4 space-y-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineProps({ title: String });
const open = ref(true);
</script>
