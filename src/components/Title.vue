<script setup>
  import { ref } from 'vue'
  import { defineProps } from 'vue';

  const props = defineProps({
    title: String,
  });
</script>

<template>
  <div class="rounded-2xl shadow-2xl max-w-md border-3" style="background: linear-gradient(135deg, rgba(66, 40, 21, 0.8) 0%, rgba(45, 24, 16, 0.9) 50%, rgba(26, 15, 8, 0.8) 100%); border-color: #CD9839; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);">
    <h1 class="text-3xl text-center p-6 font-bold" style="color: #CD9839; text-shadow: 2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(205, 151, 57, 0.3);">{{ title }}</h1>
  </div>
</template>