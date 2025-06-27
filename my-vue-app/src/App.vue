<template>
  <div class="min-h-screen bg-gray-100 p-8 flex justify-center">
    <div class="w-full max-w-4xl bg-white rounded-xl shadow-xl p-6 space-y-8">
      <h1 class="text-3xl font-bold">🧠 Prompt Generator (Vue)</h1>
      <PromptGenerator />
    </div>
  </div>
</template>

<script setup>
import PromptGenerator from './components/PromptGenerator.vue';
</script>
