<template>
  <div class="border rounded mb-4 shadow-sm">
    <button
      @click="toggle"
      class="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 flex justify-between items-center font-semibold"
      :aria-expanded="isOpen.toString()"
      :aria-controls="contentId"
      :aria-label="`${title} toggle`"
    >
      {{ title }}
      <span>{{ isOpen ? '▲' : '▼' }}</span>
    </button>

    <div
      v-show="isOpen"
      :id="contentId"
      class="p-4 bg-white border-t"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);

const contentId = computed(() => `accordion-content-${props.title.replace(/\s+/g, '-').toLowerCase()}`);

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>
