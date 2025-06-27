<template>
  <div class="relative input-with-add">
    <input
      :placeholder="placeholder"
      v-model="modelValueProxy"
      class="w-full border rounded px-3 py-2"
      @focus="show = true"
      @blur="() => setTimeout(() => show = false, 150)"
    />
    <span class="add-button" @click="addOption">+</span>

    <div v-if="show" class="absolute z-10 bg-white border rounded shadow mt-1 max-h-40 overflow-auto w-full">
      <div
        v-for="(option, idx) in filteredOptions"
        :key="idx"
        class="option-item"
        @click="selectOption(option)"
      >
        {{ option }}
        <span class="option-delete" @click.stop="removeOption(option)">×</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  placeholder: String,
  options: Array
});
const emit = defineEmits(['update:modelValue']);

const input = ref(props.modelValue || '');
const show = ref(false);
const optionsList = ref([...props.options]);

watch(() => props.modelValue, val => (input.value = val));
const modelValueProxy = computed({
  get: () => input.value,
  set: val => {
    input.value = val;
    emit('update:modelValue', val);
  }
});

const filteredOptions = computed(() =>
  optionsList.value.filter(opt =>
    opt.toLowerCase().includes(input.value.toLowerCase())
  )
);

function addOption() {
  if (!input.value.trim() || optionsList.value.includes(input.value)) return;
  optionsList.value.push(input.value);
}

function selectOption(opt) {
  modelValueProxy.value = opt;
  show.value = false;
}

function removeOption(opt) {
  optionsList.value = optionsList.value.filter(o => o !== opt);
}
</script>

<style scoped>
.option-item {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}
.option-item:hover {
  background-color: #e0e7ff;
}
.option-delete {
  color: #ef4444;
  font-weight: bold;
  cursor: pointer;
}
</style>
