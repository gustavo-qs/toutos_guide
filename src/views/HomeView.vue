<script setup>
  import { ref } from 'vue'
  import Title from '@/components/Title.vue';
  import CreatureList from '@/components/CreatureList.vue';
  import CreatureModal from '@/components/CreatureModal.vue';

  const selectedCreature = ref(null)
  const isModalOpen = ref(false)

  const handleCreatureSelected = (creature) => {
    selectedCreature.value = creature
    isModalOpen.value = true
  }

  const closeModal = () => {
    isModalOpen.value = false
    selectedCreature.value = null
  }
</script>

<template>
  <main class="min-h-screen flex flex-col" style="background: linear-gradient(135deg, #1a0f08 0%, #2d1810 25%, #422815 50%, #2d1810 75%, #1a0f08 100%);">
    <div class="flex-1 flex flex-col max-w-7xl mx-auto w-full p-8">
      <div class="text-center mb-12">
        <Title title="TOUTO'S GUIDE TO COMBAT"/>
      </div>

      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold inline-block px-8 py-3 rounded-xl border-2" style="color: #CD9839; background: rgba(66, 40, 21, 0.7); border-color: #CD9839; text-shadow: 1px 1px 3px rgba(0,0,0,0.7); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);">
          CREATURES
        </h2>
      </div>

      <div class="flex-1">
        <CreatureList @creature-selected="handleCreatureSelected"/>
      </div>
    </div>

    <!-- Modal -->
    <CreatureModal
      :creature="selectedCreature"
      :isOpen="isModalOpen"
      @close="closeModal"
    />
  </main>
</template>