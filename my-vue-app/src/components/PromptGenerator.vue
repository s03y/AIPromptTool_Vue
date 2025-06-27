<template>
  <div class="space-y-4">
    <DropdownInput
      v-model="gender"
      placeholder="Geschlecht"
      :options="['male', 'female', 'non-binary']"
    />
    <DropdownInput
      v-model="age"
      placeholder="Alter"
      :options="['20', '30', '40']"
    />
    <DropdownInput
      v-model="hair"
      placeholder="Haartyp"
      :options="['long', 'short', 'curly']"
    />
    <DropdownInput
      v-model="hairColor"
      placeholder="Haarfarbe"
      :options="['blonde', 'black', 'red']"
    />

    <button
      @click="generatePrompt"
      class="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
    >
      Prompt generieren
    </button>

    <PromptOutput :text="result" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DropdownInput from './DropdownInput.vue';
import PromptOutput from './PromptOutput.vue';

const gender = ref('');
const age = ref('');
const hair = ref('');
const hairColor = ref('');
const result = ref('');

function generatePrompt() {
  result.value = `A ${gender.value} person, ${age.value} years old, with ${hairColor.value} ${hair.value} hair.`;
}
</script>
