
<template>
  <div class="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">
    <h1 class="text-2xl font-bold mb-4">🧠 Prompt Generator</h1>

    <!-- Facial Features -->
    <CategorySection title="Facial Features">
        <DropdownInput label="Gender" v-model="prompt.gender" :options="['female', 'male', 'girl', 'man', 'woman', 'guy']" />
        <DropdownInput label="Age" v-model="prompt.age" :options="['20', '30', 'mid 20s', 'mid 30s']" />
        <DropdownInput label="Hair Type" v-model="prompt.hair.type" :options="['long', 'short', 'curly', 'wavy']" />
        <DropdownInput label="Hair Color" v-model="prompt.hair.color" :options="['black', 'brown', 'blonde']" />
        <DropdownInput label="Eyes Type" v-model="prompt.eyes.type" :options="['big', 'small', 'hooded', 'round', 'almond']" />
        <DropdownInput label="Eyes Color" v-model="prompt.eyes.color" :options="['blue', 'green', 'brown']" />
        <DropdownInput label="Skin Type" v-model="prompt.skin" :options="['white', 'brown', 'black', 'caucasian']" />
        <DropdownInput label="Skin Texture" v-model="prompt.skinTexture" :options="['smooth', 'textured', 'visible pores']" />
    </CategorySection>

    <!-- Clothing -->
    <CategorySection title="Clothing">
        <DropdownInput label="Top" v-model="prompt.top.type" :options="['T-Shirt', 'Hoodie', 'Jacket']" />
        <DropdownInput label="Top Color" v-model="prompt.top.color" :options="['red', 'blue', 'black']" />
        <DropdownInput label="Bottom" v-model="prompt.bottom.type" :options="['Jeans', 'Shorts', 'Skirt']" />
        <DropdownInput label="Bottom Color" v-model="prompt.bottom.color" :options="['black', 'white', 'gray']" />
        <DropdownInput label="Shoes" v-model="prompt.shoes.type" :options="['Sneaker', 'Boots', 'Sandals']" />
        <DropdownInput label="Shoes Color" v-model="prompt.shoes.color" :options="['white', 'black', 'beige']" />

    </CategorySection>

    <!-- Movement / Object -->
    <CategorySection title="Movement / Action">
        <DropdownInput label="Movement" v-model="prompt.movement" :options="['jump', 'dance', 'run']" />
        <DropdownInput label="Object (Person)" v-model="prompt.objekt" :options="['bag', 'phone', 'hat']" />
        <DropdownInput label="Texture" v-model="prompt.texture" :options="['Fur', 'Skin', 'Asphalt']" />
    </CategorySection>

    <!-- Surrounding -->
    <CategorySection title="Surrounding">
        <DropdownInput label="Background" v-model="prompt.background" :options="['sky', 'ocean', 'graffiti wall']" />
        <DropdownInput label="Location" v-model="prompt.location" :options="['Skatepark', 'Metro', 'Club']" />
    </CategorySection>

    <!-- Camera -->
    <CategorySection title="Camera">
        <DropdownInput label="Camera Settings" v-model="prompt.camera" :options="['50mm, soft light', 'low angle, dramatic light']" />
    </CategorySection>

    <!-- Prompt Output -->
    <PromptOutput :prompt="prompt" />
  </div>

</template>

<script setup>
import { reactive } from 'vue';
import CategorySection from '../components/CategorySection.vue';
import DropdownInput from '../components/ui/DropdownInput.vue';
import PromptOutput from '../components/PromptOutput.vue';

const prompt = reactive({
  gender: '',
  age: '',
  skin: '',
  skinTexture: '',
  hair: { type: '', color: '' },
  eyes: { type: '', color: '' },
  top: { type: '', color: '' },
  bottom: { type: '', color: '' },
  shoes: { type: '', color: '' },
  movement: '',
  objekt: '',
  background: '',
  location: '',
  camera: '',
  caption: ''
});



</script>
