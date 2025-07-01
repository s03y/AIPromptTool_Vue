<template>
  <div>
    <label class="block font-medium mb-1">{{ label }}:</label>
    <div class="flex gap-2">
      <input
        :value="modelValue"
        @input="onInput"
        class="border rounded px-3 py-2 w-full"
        :placeholder="label"
      />
      <select @change="onInput" class="border rounded px-2">
        <option value="">-</option>
        <option
          v-for="option in options"
          :key="option"
          :value="option"
        >{{ option }}</option>
      </select>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  label: String,
  options: Array
});
const emit = defineEmits(['update:modelValue']);

function onInput(event) {
  emit('update:modelValue', event.target.value);
}
</script>
