<script setup>
  import { ref } from 'vue'
  import { defineProps } from 'vue';

  const props = defineProps({
    title: String,
  });
</script>

<template>
  <div class="m-0 bg-dark-black rounded-2xl shadow-dark shadow-md min-w-4 max-w-md">
    <h1 class="text-2xl text-center p-5 font-bold text-golden">{{ title }}</h1>
  </div>
</template>