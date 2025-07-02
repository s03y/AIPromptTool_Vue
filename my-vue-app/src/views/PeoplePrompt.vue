<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6">People Prompt Generator</h1>

    <div class="max-w-7xl mx-auto flex gap-6 items-start">
      
      <!-- Kategorien Container (75%) -->
      <div class="w-3/4 space-y-4">
        <div
          v-for="(subcategories, category) in categories"
          :key="category"
          class="bg-white rounded-lg shadow-md"
        >
          <!-- Header mit Klick zum Ein-/Ausklappen -->
          <button
            @click="toggleCategory(category)"
            class="w-full flex justify-between items-center px-6 py-4 text-left text-xl font-semibold border-b border-gray-300 focus:outline-none"
          >
            <span>{{ category }}</span>
            <span>
              <svg
                :class="{'transform rotate-180': isCategoryOpen(category)}"
                class="w-5 h-5 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
              </svg>
            </span>
          </button>

          <!-- Kategorie Inhalt, nur sichtbar wenn aufgeklappt -->
          <div v-show="isCategoryOpen(category)" class="p-6 space-y-6">
            <div class="grid grid-cols-2 gap-6">
              <div
                v-for="(config, subcategory) in subcategories"
                :key="subcategory"
                class="space-y-2"
                :ref="(el) => registerWrapper(el, category, subcategory)"
              >
                <div class="font-medium text-gray-700">{{ subcategory }}</div>

                <div class="relative">
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
      </div>

      <!-- Prompt Container (25%) -->
      <div class="bg-white p-6 rounded-lg shadow-md w-1/4">
        <h2 class="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">
          Final Prompt
        </h2>
        <textarea
          readonly
          class="w-full h-60 p-4 border border-gray-300 rounded-md resize-none focus:outline-none"
          :value="finalPrompt"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, onBeforeUnmount, ref } from 'vue';

const categories = reactive({
  'Facial Features': {
    Gender: {
      input: '',
      options: ['female', 'male', 'girl', 'boy'],
      showDropdown: false,
    },
    Age: {
      input: '',
      options: ['20 years old', '30 years old'],
      showDropdown: false,
    },
    Ethnicity: {
      input: '',
      options: ['Caucasian', 'Hispanic', 'Asian' , 'African'],
      showDropdown: false,
    },
    FaceShape: {
      input: '',
      options: ['oval', 'square', 'diamond', 'round','long', 'heart'],
      showDropdown: false,
    },
    Hair: {
      input: '',
      color: '',
      options: ['short', 'long', 'curly', 'bald'],
      colorOptions: ['blonde', 'brown', 'black', 'red', 'blue'],
      showDropdown: false,
      showDropdownColor: false,
    },
    Eyes: {
      input: '',
      color: '',
      options: ['big', 'small', 'hooded', 'monolid', 'almond', 'round'],
      colorOptions: ['blue', 'green', 'hazel'],
      showDropdown: false,
      showDropdownColor: false,
    },
    Eyelashes: {
      input: '',
      color: '',
      options: ['natural', 'false cat-eye', 'false doll-eye'],
      colorOptions: ['black', 'brown', 'blonde', 'same as hair color'],
      showDropdown: false,
      showDropdownColor: false,
    },
    Eyebrows: {
      input: '',
      color: '',
      options: ['rounded', 'small arch', 'medium arch', 'soft angled', 'hard angled', 'straight'],
      colorOptions: ['black', 'brown', 'blue', 'same as hair color'],
      showDropdown: false,
      showDropdownColor: false,
    },
    Nose: {
      input: '',
      options: ['small nose', 'big nose', 'button nose'],
      showDropdown: false,
    },
    Lips: {
        input: '',
        options: ['full lips', 'thin lips', 'round lips', 'pouty lips'],
        showDropdown: false,
    },
    Beard: {
      input: '',
      color: '',
      options: ['balbo', 'short boxed', 'stubble', 'circle', 'mutton chops', 'anchor', 'goatee', 'full'],
      colorOptions: ['black', 'brown', 'blonde', 'same as hair color'],
      showDropdown: false,
      showDropdownColor: false,
    },
    Mouth: {
      input: '',
      options: ['smiling', 'open mouth'],
      showDropdown: false,
    },
    SkinTexture: {
      input: '',
      options: ['visible pores', 'smooth'],
      showDropdown: false,
    },
    Piercings: {
      input: '',
      options: ['nostril', 'eyebrows', 'septum', 'medusa', 'snake bites'],
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

// Zustände für ausgeklappte Kategorien
const openCategories = ref(Object.keys(categories).reduce((acc, key) => {
  acc[key] = true; // standardmäßig alle offen (kann auf false gesetzt werden)
  return acc;
}, {}));

function toggleCategory(category) {
  openCategories.value[category] = !openCategories.value[category];
}

function isCategoryOpen(category) {
  return openCategories.value[category];
}

// Die übrigen Methoden unverändert übernehmen, z.B. addToOptions, selectOption etc.
// ... (copy-paste deiner existierenden Methoden hier)

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
  for (const category in categories) {
    for (const subcategory in categories[category]) {
      const conf = categories[category][subcategory];
      if (
        conf.showDropdown &&
        wrapperRefs[category][subcategory] &&
        !wrapperRefs[category][subcategory].contains(event.target)
      ) {
        conf.showDropdown = false;
      }
      if (
        conf.showDropdownColor &&
        wrapperRefs[category][subcategory] &&
        !wrapperRefs[category][subcategory].contains(event.target)
      ) {
        conf.showDropdownColor = false;
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});

const finalPrompt = computed(() => {
  let result = '';
  for (const category in categories) {
    for (const subcategory in categories[category]) {
      const conf = categories[category][subcategory];
      if (conf.input) {
        if ('color' in conf && conf.color) {
          result += `${conf.input} ${conf.color}, `;
        } else {
          result += `${conf.input}, `;
        }
      }
    }
  }
  return result.trim().replace(/,$/, '');
});
</script>
