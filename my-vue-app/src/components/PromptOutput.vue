<template>
  <div class="mt-4">
    <h2 class="font-semibold mb-2">Generated Prompt:</h2>
    <pre class="bg-gray-100 p-4 border rounded whitespace-pre-wrap text-sm leading-relaxed">
{{ generatedPrompt }}
    </pre>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePromptBuilder } from '../modules/usePromptBuilder.js';

const props = defineProps({ prompt: Object });
const generate = usePromptBuilder(props.prompt);
const generatedPrompt = computed(() => generate());
</script>
