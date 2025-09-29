<script setup>
import { computed } from 'vue'

const props = defineProps({
  creature: {
    type: Object,
    default: null
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const creatureImagePath = computed(() => {
  if (!props.creature?.name) return null
  // Convert creature name to filename format (lowercase, replace spaces with hyphens)
  const filename = props.creature.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  return `https://www.dndbeyond.com/avatars/thumbnails/0/11/${filename}.jpeg`
})

const getCreatureTypeIcon = (size) => {
  if (!size) return '🐉'
  const sizeType = size.toLowerCase()
  if (sizeType.includes('dragon')) return '🐉'
  if (sizeType.includes('humanoid')) return '🧙‍♂️'
  if (sizeType.includes('beast')) return '🐺'
  if (sizeType.includes('undead')) return '💀'
  if (sizeType.includes('fiend')) return '👹'
  if (sizeType.includes('celestial')) return '👼'
  if (sizeType.includes('fey')) return '🧚‍♀️'
  if (sizeType.includes('elemental')) return '🌪️'
  if (sizeType.includes('aberration')) return '🐙'
  if (sizeType.includes('construct')) return '🤖'
  if (sizeType.includes('giant')) return '🗿'
  if (sizeType.includes('monstrosity')) return '🐲'
  if (sizeType.includes('ooze')) return '🟢'
  if (sizeType.includes('plant')) return '🌿'
  return '⚔️'
}

const formatDescription = (description) => {
  if (!description) return ''

  // Convert markdown-style formatting to HTML with D&D styling
  // Process in correct order: headers first, then lists, then formatting
  return description
    .replace(/^### (.*)$/gm, '<br><h3 class="text-xl font-bold mt-6 mb-3" style="color: #CD9839; text-align: center;">$1</h3>')
    .replace(/^\* (.*)$/gm, '<br>• $1')
    .replace(/\*\*\*(.*?)\*\*\*/g, '<br><strong style="color: #CD9839;"><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #CD9839;">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em style="color: rgb(196, 164, 132);">$1</em>')
    .replace(/<i>(.*?)<\/i>/gi, '<em style="color: #CD9839; font-weight: bold; font-style: italic;">$1</em>')
    .replace(/(\d+d\d+(?:[+-]\d+)?)/g, '<span style="color: #CD9839; font-weight: bold;">$1</span>')
    .replace(/\bDC \d+\b/gi, '<span style="color: #CD9839; font-weight: bold;">$&</span>')
    .replace(/\bpassive Perception \d+\b/gi, '<span style="color: #CD9839; font-weight: bold;">$&</span>')
    .replace(/\bspell save DC \d+\b/gi, '<span style="color: #CD9839; font-weight: bold;">$&</span>')
    .replace(/\+?\d+ to hit\b/gi, '<span style="color: #CD9839; font-weight: bold;">$&</span>')
    .replace(/\breach \d+ ft\b/gi, '<span style="color: #CD9839; font-weight: bold;">$&</span>')
    .replace(/\b\d+ ft\.?\b/gi, '<span style="color: #CD9839; font-weight: bold;">$&</span>')
    .replace(/\b\d+ \(.*?\)/g, '<span style="color: #CD9839; font-weight: bold;">$&</span>')
    .replace(/\b\d+th-level\b/gi, '<span style="color: #CD9839; font-weight: bold;">$&</span>')
    .replace(/\(\d+ slots?\)/gi, '<span style="color: #CD9839; font-weight: bold;">$&</span>')
    .replace(/\bregains \d+ hit points\b/gi, '<span style="color: #CD9839; font-weight: bold;">$&</span>')
    .replace(/\btakes \d+ \w+ damage\b/gi, '<span style="color: #CD9839; font-weight: bold;">$&</span>')
    .replace(/\bPLUS \d+\b/gi, '<span style="color: #CD9839; font-weight: bold;">$&</span>')
    .replace(/:\s*\d+/g, '<span style="color: #CD9839; font-weight: bold;">$&</span>')
    .replace(/\+\d+/g, '<span style="color: #CD9839; font-weight: bold;">$&</span>')
    .replace(/\n\n+/g, '</p><p class="mb-3" style="color: rgb(196, 164, 132);">')
    .replace(/^\s*/, '<p class="mb-3" style="color: rgb(196, 164, 132);">')
    .replace(/\s*$/, '</p>')
}

const getStatModifier = (stat) => {
  if (!stat) return ''
  const match = stat.match(/\(([+-]?\d+)\)/)
  return match ? match[1] : ''
}
</script>

<template>
  <!-- Modal Overlay -->
  <div 
    v-if="isOpen && creature" 
    class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
    @click="closeModal"
  >
    <!-- Modal Content -->
    <div 
      class="max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      style="background: linear-gradient(135deg, #422815 0%, #5a3419 100%); border: 3px solid #CD9839; border-radius: 12px;"
      @click.stop
    >
      <!-- Modal Header -->
      <div class="sticky top-0 z-20 p-6 border-b-2" style="border-color: #CD9839; background: linear-gradient(90deg, #422815 0%, #5a3419 100%); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
        <!-- Decorative corners -->
        <div class="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2" style="border-color: #CD9839;"></div>
        <div class="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2" style="border-color: #CD9839;"></div>
        
        <div class="flex justify-between items-start">
          <div class="flex items-start gap-6">
            <!-- Creature Image/Icon -->
            <div class="flex-shrink-0">
              <div class="w-20 h-20 rounded-lg flex items-center justify-center border-2" 
                   style="background: linear-gradient(135deg, #A56758 0%, #8b5447 100%); border-color: #CD9839;">
                <span class="text-4xl">{{ getCreatureTypeIcon(creature.size) }}</span>
              </div>
            </div>
            
            <!-- Creature Info -->
            <div>
              <h2 class="text-4xl font-bold mb-2 tracking-wide" style="color: #CD9839; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                {{ creature.name.toUpperCase() }}
              </h2>
              <p class="text-lg font-semibold" style="color: #CD9839;">{{ creature.size }}</p>
              <p class="text-base" style="color: rgb(196, 164, 132);">{{ creature.alignment }}</p>
            </div>
          </div>
          
          <button 
            @click="closeModal"
            class="transition-colors p-2 rounded-lg hover:bg-black/20"
            style="color: #CD9839;"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Decorative bottom corners -->
        <div class="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2" style="border-color: #CD9839;"></div>
        <div class="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2" style="border-color: #CD9839;"></div>
      </div>

      <!-- Modal Body -->
      <div class="p-6 pt-8">
        <!-- Basic Stats Row -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Armor Class -->
          <div class="text-center p-4 rounded-lg border-2" style="background: rgba(165, 103, 88, 0.2); border-color: #CD9839;">
            <div class="flex items-center justify-center gap-2 mb-3">
              <svg class="w-6 h-6" style="color: #CD9839;" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <span class="font-bold text-lg" style="color: #CD9839;">AC</span>
            </div>
            <div class="text-3xl font-bold" style="color: #CD9839;">
              {{ creature.armor_class || '?' }}
            </div>
          </div>

          <!-- Hit Points -->
          <div class="text-center p-4 rounded-lg border-2" style="background: rgba(165, 103, 88, 0.2); border-color: #CD9839;">
            <div class="flex items-center justify-center gap-2 mb-3">
              <svg class="w-6 h-6" style="color: #CD9839;" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
              </svg>
              <span class="font-bold text-lg" style="color: #CD9839;">HP</span>
            </div>
            <div class="text-3xl font-bold" style="color: #CD9839;">
              {{ creature.hit_points ? creature.hit_points.split(' ')[0] : '?' }}
            </div>
            <div class="text-sm mt-1" style="color: rgb(196, 164, 132);">
              {{ creature.hit_points ? creature.hit_points.split(' ').slice(1).join(' ') : '' }}
            </div>
          </div>

          <!-- Speed -->
          <div class="text-center p-4 rounded-lg border-2" style="background: rgba(165, 103, 88, 0.2); border-color: #CD9839;">
            <div class="flex items-center justify-center gap-2 mb-3">
              <svg class="w-6 h-6" style="color: #CD9839;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span class="font-bold text-lg" style="color: #CD9839;">SPEED</span>
            </div>
            <div class="text-lg font-bold" style="color: #CD9839;">
              {{ creature.speed || 'Unknown' }}
            </div>
          </div>
        </div>

        <!-- Ability Scores -->
        <div class="mb-8 p-6 rounded-lg border-2" style="background: rgba(66, 40, 21, 0.3); border-color: #CD9839;">
          <!-- Decorative line -->
          <div class="w-full h-1 mb-6" style="background: linear-gradient(90deg, transparent 0%, #CD9839 50%, transparent 100%);"></div>
          
          <div class="grid grid-cols-3 md:grid-cols-6 gap-6">
            <div class="text-center">
              <div class="text-lg font-bold mb-1" style="color: #CD9839;">STR</div>
              <div class="text-2xl font-bold mb-1" style="color: #CD9839;">{{ creature.str?.split(' ')[0] || '10' }}</div>
              <div class="text-sm" style="color: rgb(196, 164, 132);">({{ getStatModifier(creature.str) || '+0' }})</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold mb-1" style="color: #CD9839;">DEX</div>
              <div class="text-2xl font-bold mb-1" style="color: #CD9839;">{{ creature.dex?.split(' ')[0] || '10' }}</div>
              <div class="text-sm" style="color: rgb(196, 164, 132);">({{ getStatModifier(creature.dex) || '+0' }})</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold mb-1" style="color: #CD9839;">CON</div>
              <div class="text-2xl font-bold mb-1" style="color: #CD9839;">{{ creature.con?.split(' ')[0] || '10' }}</div>
              <div class="text-sm" style="color: rgb(196, 164, 132);">({{ getStatModifier(creature.con) || '+0' }})</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold mb-1" style="color: #CD9839;">INT</div>
              <div class="text-2xl font-bold mb-1" style="color: #CD9839;">{{ creature.int?.split(' ')[0] || '10' }}</div>
              <div class="text-sm" style="color: rgb(196, 164, 132);">({{ getStatModifier(creature.int) || '+0' }})</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold mb-1" style="color: #CD9839;">WIS</div>
              <div class="text-2xl font-bold mb-1" style="color: #CD9839;">{{ creature.wis?.split(' ')[0] || '10' }}</div>
              <div class="text-sm" style="color: rgb(196, 164, 132);">({{ getStatModifier(creature.wis) || '+0' }})</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold mb-1" style="color: #CD9839;">CHA</div>
              <div class="text-2xl font-bold mb-1" style="color: #CD9839;">{{ creature.cha?.split(' ')[0] || '10' }}</div>
              <div class="text-sm" style="color: rgb(196, 164, 132);">({{ getStatModifier(creature.cha) || '+0' }})</div>
            </div>
          </div>
          
          <!-- Decorative line -->
          <div class="w-full h-1 mt-6" style="background: linear-gradient(90deg, transparent 0%, #CD9839 50%, transparent 100%);"></div>
        </div>

        <!-- Additional Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <div v-if="creature.skills" class="p-3 rounded-lg border" style="background: rgba(196, 164, 132, 0.1); border-color: #A56758;">
              <span class="font-bold" style="color: #CD9839;">SKILLS</span>
              <div class="mt-2" style="color: rgb(196, 164, 132);">{{ creature.skills }}</div>
            </div>

            <div v-if="creature.saving_throws" class="p-3 rounded-lg border" style="background: rgba(196, 164, 132, 0.1); border-color: #A56758;">
              <span class="font-bold" style="color: #CD9839;">SAVING THROWS</span>
              <div class="mt-2" style="color: rgb(196, 164, 132);">{{ creature.saving_throws }}</div>
            </div>

            <div v-if="creature.damage_resistances" class="p-3 rounded-lg border" style="background: rgba(196, 164, 132, 0.1); border-color: #A56758;">
              <span class="font-bold" style="color: #CD9839;">DAMAGE RESISTANCES</span>
              <div class="mt-2" style="color: rgb(196, 164, 132);">{{ creature.damage_resistances }}</div>
            </div>

          <div v-if="creature.senses" class="p-3 rounded-lg border" style="background: rgba(196, 164, 132, 0.1); border-color: #A56758;">
            <span class="font-bold" style="color: #CD9839;">SENSES</span>
            <div class="mt-2" style="color: rgb(196, 164, 132);">{{ creature.senses }}</div>
          </div>

          <div v-if="creature.languages" class="p-3 rounded-lg border" style="background: rgba(196, 164, 132, 0.1); border-color: #A56758;">
            <span class="font-bold" style="color: #CD9839;">LANGUAGES</span>
            <div class="mt-2" style="color: rgb(196, 164, 132);">{{ creature.languages }}</div>
          </div>

          <div v-if="creature.damage_immunities" class="p-3 rounded-lg border" style="background: rgba(196, 164, 132, 0.1); border-color: #A56758;">
            <span class="font-bold" style="color: #CD9839;">DAMAGE IMMUNITIES</span>
            <div class="mt-2" style="color: rgb(196, 164, 132);">{{ creature.damage_immunities }}</div>
          </div>

          <div v-if="creature.challenge" class="p-3 rounded-lg border" style="background: rgba(196, 164, 132, 0.1); border-color: #A56758;">
            <span class="font-bold" style="color: #CD9839;">CHALLENGE</span>
            <div class="mt-2 text-xl font-bold" style="color: #CD9839;">{{ creature.challenge }}</div>
          </div>
        </div>

        <!-- Description/Abilities -->
        <div v-if="creature.description" class="p-6 rounded-lg border-2" style="background: rgba(66, 40, 21, 0.2); border-color: #CD9839;">
          <!-- Decorative line -->
          <div class="w-full h-1 mb-6" style="background: linear-gradient(90deg, transparent 0%, #CD9839 50%, transparent 100%);"></div>
          
          <h3 class="text-2xl font-bold mb-6 text-center" style="color: #CD9839;">ACTIONS & ABILITIES</h3>
          
          <div
            class="leading-relaxed prose prose-invert max-w-none"
            style="color: rgb(196, 164, 132); text-align: justify; hyphens: auto; word-wrap: break-word; overflow-wrap: break-word;"
            v-html="formatDescription(creature.description)"
          ></div>
          
          <!-- Decorative line -->
          <div class="w-full h-1 mt-6" style="background: linear-gradient(90deg, transparent 0%, #CD9839 50%, transparent 100%);"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 12px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #422815;
  border-radius: 6px;
  border: 1px solid #CD9839;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #CD9839 0%, #A56758 100%);
  border-radius: 6px;
  border: 1px solid #422815;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #e6a942 0%, #b8725f 100%);
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom prose styling for D&D theme */
.prose h3 {
  color: #CD9839 !important;
  font-weight: bold;
  text-align: center;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose p {
  color: rgb(196, 164, 132) !important;
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.prose strong {
  color: #CD9839 !important;
  font-weight: bold;
}

.prose em {
  color: rgb(196, 164, 132) !important;
  font-style: italic;
}

.prose p {
  text-align: justify;
  hyphens: auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.prose br {
  display: block;
  margin: 0.75rem 0;
}

.prose strong {
  display: inline-block;
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
}
</style>
