<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6">People Prompt Generator</h1>
    <div class="max-w-7xl mx-auto space-y-8 flex flex-col lg:flex-row gap-6">
      <!-- Kategorien Container 75% Breite -->
      <div
        class="bg-white p-6 rounded-lg shadow-md w-full lg:w-3/4"
      >
        <div
          v-for="(subcategories, category) in categories"
          :key="category"
          class="mb-8"
        >
          <h2 class="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
            {{ category }}
          </h2>

          <div class="grid grid-cols-2 gap-6">
            <div
              v-for="(config, subcategory) in subcategories"
              :key="subcategory"
              class="space-y-2"
              :ref="(el) => registerWrapper(el, category, subcategory)"
            >
              <div class="font-medium text-gray-700">{{ subcategory }}</div>

              <div class="relative">
                <!-- Hauptfeld Input + Dropdown + + Button -->
                <input
                  v-model="config.input"
                  @focus="config.showDropdown = true"
                  type="text"
                  placeholder="Type or select value"
                  class="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-blue-600 text-xl font-bold focus:outline-none"
                  @mousedown.prevent
                  @click="addToOptions(category, subcategory)"
                  aria-label="Add option"
                >
                  +
                </button>

                <ul
                  v-show="config.showDropdown && config.options.length > 0"
                  class="absolute z-20 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-auto shadow-lg"
                >
                  <li
                    v-for="option in config.options"
                    :key="option"
                    class="flex justify-between items-center px-3 py-2 hover:bg-blue-50 cursor-pointer"
                  >
                    <span
                      @mousedown.prevent
                      @click="selectOption(category, subcategory, option)"
                    >
                      {{ option }}
                    </span>
                    <button
                      class="text-gray-400 text-sm hover:text-red-600"
                      @mousedown.prevent
                      @click="removeOption(category, subcategory, option)"
                      aria-label="Remove option"
                    >
                      ✕
                    </button>
                  </li>
                </ul>
              </div>

              <!-- Color Feld mit Dropdown + + Button -->
              <div v-if="'color' in config" class="relative mt-2">
                <input
                  v-model="config.color"
                  @focus="config.showDropdownColor = true"
                  type="text"
                  placeholder="color"
                  class="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-blue-600 text-xl font-bold focus:outline-none"
                  @mousedown.prevent
                  @click="addToColorOptions(category, subcategory)"
                  aria-label="Add color option"
                >
                  +
                </button>

                <ul
                  v-show="config.showDropdownColor && config.colorOptions.length > 0"
                  class="absolute z-20 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-auto shadow-lg"
                >
                  <li
                    v-for="option in config.colorOptions"
                    :key="option"
                    class="flex justify-between items-center px-3 py-2 hover:bg-blue-50 cursor-pointer"
                  >
                    <span
                      @mousedown.prevent
                      @click="selectColorOption(category, subcategory, option)"
                    >
                      {{ option }}
                    </span>
                    <button
                      class="text-gray-400 text-sm hover:text-red-600"
                      @mousedown.prevent
                      @click="removeColorOption(category, subcategory, option)"
                      aria-label="Remove color option"
                    >
                      ✕
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Final Prompt Container rechts 25% Breite -->
      <div
        class="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/4 h-fit sticky top-6"
      >
        <h2 class="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
          Final Prompt
        </h2>
        <textarea
          readonly
          class="w-full h-36 p-4 border border-gray-300 rounded-md resize-none focus:outline-none"
          :value="finalPrompt"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, onBeforeUnmount } from 'vue';

const categories = reactive({
  'Facial Features': {
    Hair: {
      input: '',
      color: '',
      options: ['short hair', 'long hair', 'curly hair', 'bald'],
      colorOptions: ['blonde', 'brown', 'black', 'red'],
      showDropdown: false,
      showDropdownColor: false,
    },
    Eyes: {
      input: '',
      color: '',
      options: ['blue eyes', 'green eyes', 'brown eyes'],
      colorOptions: ['blue', 'green', 'hazel'],
      showDropdown: false,
      showDropdownColor: false,
    },
    Nose: {
      input: '',
      options: ['small nose', 'big nose'],
      showDropdown: false,
    },
    Mouth: {
      input: '',
      options: ['smiling', 'open mouth'],
      showDropdown: false,
    },
  },
  Clothing: {
    Top: {
      input: '',
      color: '',
      options: ['t-shirt', 'blouse', 'jacket'],
      colorOptions: ['red', 'blue', 'green', 'black'],
      showDropdown: false,
      showDropdownColor: false,
    },
    Bottom: {
      input: '',
      color: '',
      options: ['jeans', 'skirt', 'shorts'],
      colorOptions: ['blue', 'black', 'white'],
      showDropdown: false,
      showDropdownColor: false,
    },
    Accessories: {
      input: '',
      color: '',
      options: ['glasses', 'hat', 'necklace'],
      colorOptions: ['gold', 'silver', 'black'],
      showDropdown: false,
      showDropdownColor: false,
    },
  },
  Action: {
    Pose: {
      input: '',
      options: ['sitting', 'standing', 'walking'],
      showDropdown: false,
    },
    Gesture: {
      input: '',
      options: ['waving', 'pointing'],
      showDropdown: false,
    },
  },
  Surrounding: {
    Background: {
      input: '',
      options: ['city', 'forest', 'studio'],
      showDropdown: false,
    },
    Lighting: {
      input: '',
      options: ['natural light', 'studio light'],
      showDropdown: false,
    },
  },
  Camera: {
    Angle: {
      input: '',
      options: ['top view', 'side view', 'front view'],
      showDropdown: false,
    },
    ShotType: {
      input: '',
      options: ['portrait', 'close-up', 'full body'],
      showDropdown: false,
    },
  },
});

function addToOptions(category, subcategory) {
  const conf = categories[category][subcategory];
  const val = conf.input.trim();
  if (val && !conf.options.includes(val)) {
    conf.options.unshift(val);
  }
}

function addToColorOptions(category, subcategory) {
  const conf = categories[category][subcategory];
  const val = conf.color.trim();
  if (val && !conf.colorOptions.includes(val)) {
    conf.colorOptions.unshift(val);
  }
}

function selectOption(category, subcategory, option) {
  categories[category][subcategory].input = option;
  categories[category][subcategory].showDropdown = false;
}

function selectColorOption(category, subcategory, option) {
  categories[category][subcategory].color = option;
  categories[category][subcategory].showDropdownColor = false;
}

function removeOption(category, subcategory, option) {
  const conf = categories[category][subcategory];
  conf.options = conf.options.filter((item) => item !== option);
}

function removeColorOption(category, subcategory, option) {
  const conf = categories[category][subcategory];
  conf.colorOptions = conf.colorOptions.filter((item) => item !== option);
}

const wrapperRefs = {};

function registerWrapper(el, category, subcategory) {
  if (!wrapperRefs[category]) wrapperRefs[category] = {};
  wrapperRefs[category][subcategory] = el;
}

function handleClickOutside(event) {
  for (const category in wrapperRefs) {
    for (const subcategory in wrapperRefs[category]) {
      const el = wrapperRefs[category][subcategory];
      if (!el.contains(event.target)) {
        categories[category][subcategory].showDropdown = false;
        categories[category][subcategory].showDropdownColor = false;
      }
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const finalPrompt = computed(() => {
  const parts = [];
  Object.values(categories).forEach((subcategories) => {
    Object.values(subcategories).forEach((config) => {
      if (config.input?.trim()) parts.push(config.input.trim());
      if (config.color?.trim()) parts.push(config.color.trim());
    });
  });
  return parts.join(', ');
});
</script>
