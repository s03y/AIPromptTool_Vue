<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  sidebarOpen: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <aside
    :class="[
      'bg-white shadow-md p-4',
      props.sidebarOpen ? 'fixed inset-0 w-48 z-50' : 'hidden md:block md:w-48'
    ]"
  >
    <nav>
      <ul>
        <li>
          <button class="text-left w-full py-2 px-3 rounded hover:bg-gray-200 font-semibold">
            People
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>
