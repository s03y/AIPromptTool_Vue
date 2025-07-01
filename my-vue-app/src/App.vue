<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Header />
    <div class="flex flex-1 p-6">
      <Sidebar :sidebarOpen="sidebarOpen" />
      <main class="flex-1 ml-0 md:ml-6">
        <PeoplePrompt />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import PeoplePrompt from './views/PeoplePrompt.vue';

const sidebarOpen = ref(false);
</script>
