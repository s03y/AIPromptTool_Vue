<template>
  <pre class="p-4 bg-gray-100 border rounded whitespace-pre-wrap">
    {{ text }}
  </pre>
</template>

<script setup>
defineProps({ text: String });
</script>
