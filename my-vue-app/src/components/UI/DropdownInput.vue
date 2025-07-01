<template>
  <div class="w-full" ref="dropdownRef">
    <label class="block font-medium mb-1">{{ label }}:</label>
    <div class="relative flex items-center">
      <input
        v-model="inputValue"
        @focus="showDropdown = true"
        @input="filterOptions"
        :placeholder="label"
        class="w-full border rounded px-3 py-2"
      />
      <button
        class="ml-2 text-xl font-bold text-gray-500 hover:text-blue-600"
        @mousedown.prevent="addOption"
        title="Add new option"
      >
        +
      </button>

      <!-- Dropdown unterhalb -->
      <ul
        v-show="showDropdown && filteredOptions.length"
        class="absolute left-0 top-full mt-1 z-10 bg-white border rounded shadow w-full max-h-40 overflow-y-auto"
      >
        <li
          v-for="option in filteredOptions"
          :key="option"
          @mousedown.prevent="selectOption(option)"
          class="px-3 py-1 hover:bg-blue-100 cursor-pointer"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  modelValue: String,
  label: String,
  options: Array
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue || '');
const showDropdown = ref(false);
const internalOptions = ref([...props.options]);
const filteredOptions = ref([...props.options]);
const dropdownRef = ref(null);

watch(() => props.modelValue, val => {
  inputValue.value = val || '';
});

function filterOptions() {
  const term = inputValue.value.toLowerCase();
  filteredOptions.value = internalOptions.value.filter(opt =>
    opt.toLowerCase().includes(term)
  );
}

function selectOption(option) {
  inputValue.value = option;
  emit('update:modelValue', option);
  showDropdown.value = false;
}

function addOption() {
  const newOption = inputValue.value.trim();
  if (!newOption) return;
  if (!internalOptions.value.includes(newOption)) {
    internalOptions.value.push(newOption);
  }
  emit('update:modelValue', newOption);
  showDropdown.value = false;
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
