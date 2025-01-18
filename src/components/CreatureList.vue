<script setup>
import { ref, onMounted, defineComponent } from "vue";
import creatures from "@/assets/creatures.json";



</script>

<template>
  <div class="bg-dark-black w-100 rounded-2xl mt-1 flex flex-col">
    <input type="text" class="bg-dark-red m-10 stroke-stroke-red-950 rounded-md text-zinc-400 placeholder-gray-500 placeholder-opacity-50 p-2 w-fit" placeholder="Search creatures..."/>

    <div class="flex flex-wrap justify-center gap-4 mx-1">
      <div v-for="creature in creatures" :key="creature.name" class="flex flex-col items-center justify-center bg-[#1e1e1e] text-[#d4a053] rounded-lg shadow-md p-20 w-48 h-28 text-center">
        <h3 class="text-lg font-bold uppercase tracking-wide">{{ creature.name }}</h3>
        <div class="flex justify-between gap-4 text-sm text-[#d4a053] mt-2">
          <span class="flex items-center gap-1">
            ❤️ <span>{{ creature["Hit Points"].split(' ')[0] }}</span>
          </span>
          <span class="flex items-center gap-1">
            🛡️ <span>{{ creature["Armor Class"].split(' ')[0] }}</span>
          </span>
        </div>
      </div>
    </div>

  </div>
</template>