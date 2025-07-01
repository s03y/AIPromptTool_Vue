<template>
  <section class="max-w-7xl mx-auto p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-6">Categories</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Accordion title="Facial Features">
        <!-- Beispielinhalt Facial Features -->
        <ul class="list-disc list-inside">
          <li>Eye shape</li>
          <li>Nose size</li>
          <li>Mouth expression</li>
        </ul>
      </Accordion>

      <Accordion title="Clothing">
        <ul class="list-disc list-inside">
          <li>Shirt</li>
          <li>Jacket</li>
          <li>Accessories</li>
        </ul>
      </Accordion>

      <Accordion title="Action">
        <ul class="list-disc list-inside">
          <li>Walking</li>
          <li>Running</li>
          <li>Jumping</li>
        </ul>
      </Accordion>

      <Accordion title="Surrounding">
        <ul class="list-disc list-inside">
          <li>Urban</li>
          <li>Nature</li>
          <li>Indoor</li>
        </ul>
      </Accordion>

      <Accordion title="Camera">
        <p>Camera preview or upload controls go here.</p>
      </Accordion>
    </div>

    <section class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Persons</h2>
      <PeoplePromptList />
    </section>

    <section class="mt-8">
      <label for="finalPrompt" class="block text-lg font-semibold mb-2">Final Prompt</label>
      <textarea
        id="finalPrompt"
        rows="6"
        v-model="finalPrompt"
        class="w-full p-4 border rounded shadow-sm resize-none"
        placeholder="Your final AI prompt will appear here..."
      ></textarea>
    </section>
  </section>
</template>

<script setup>
import Accordion from '@/components/Accordion.vue';
import PeoplePromptList from '@/components/PeoplePromptList.vue'; // Alternativ falls du es so nennst
import { ref } from 'vue';

const finalPrompt = ref('');
</script>
