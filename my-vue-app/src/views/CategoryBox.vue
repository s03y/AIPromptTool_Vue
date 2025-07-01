<template>
  <div class="border rounded p-4 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <p class="text-gray-600 text-sm">Content for {{ title }} goes here.</p>
    <!-- Hier kannst du Inputs, Listen, Controls ergänzen -->
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
