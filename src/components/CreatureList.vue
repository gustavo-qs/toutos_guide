<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { loadCreatures, clearCreatureCache } from "@/utils/creatureLoader.js";

const search = ref("");
const creatures = ref([]);
const isLoading = ref(true);
const isLoadingMore = ref(false);
const hasMore = ref(false);
const totalCount = ref(0);

// Performance settings
const PAGE_SIZE = 50; // Load 50 creatures at a time
const SEARCH_DEBOUNCE = 300; // 300ms debounce for search

let searchTimeout = null;

onMounted(async () => {
  await loadInitialCreatures();
});

const loadInitialCreatures = async () => {
  isLoading.value = true;
  try {
    const result = await loadCreatures({
      limit: PAGE_SIZE,
      searchTerm: search.value
    });

    creatures.value = result.creatures;
    hasMore.value = result.hasMore;
    totalCount.value = result.total;
  } catch (error) {
    console.error('Failed to load creatures:', error);
    creatures.value = [];
  } finally {
    isLoading.value = false;
  }
};

const loadMoreCreatures = async () => {
  if (isLoadingMore.value || !hasMore.value) return;

  isLoadingMore.value = true;
  try {
    const result = await loadCreatures({
      limit: PAGE_SIZE,
      offset: creatures.value.length,
      searchTerm: search.value
    });

    creatures.value.push(...result.creatures);
    hasMore.value = result.hasMore;
    totalCount.value = result.total;
  } catch (error) {
    console.error('Failed to load more creatures:', error);
  } finally {
    isLoadingMore.value = false;
  }
};

const searchCreatures = async () => {
  // Clear existing timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // Debounce search to avoid too many requests
  searchTimeout = setTimeout(async () => {
    isLoading.value = true;
    try {
      const result = await loadCreatures({
        limit: PAGE_SIZE,
        searchTerm: search.value
      });

      creatures.value = result.creatures;
      hasMore.value = result.hasMore;
      totalCount.value = result.total;
    } catch (error) {
      console.error('Failed to search creatures:', error);
    } finally {
      isLoading.value = false;
    }
  }, SEARCH_DEBOUNCE);
};

const clearSearch = () => {
  search.value = "";
  searchCreatures();
};


const getCreatureTypeIcon = (size) => {
  if (!size) return '⚔️'
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
};

watch(search, () => {
  searchCreatures();
});

// Expose methods for parent components
defineExpose({
  clearCache: clearCreatureCache
});

</script>

<template>
  <div class="w-full flex flex-col h-full shadow-2xl border-3" style="border-color: #CD9839; background: linear-gradient(135deg, #422815 0%, #2d1810 50%, #1a0f08 100%);">
    <!-- Search Section -->
    <div class="p-6 border-b-2" style="border-color: #CD9839;">
      <div class="relative max-w-md mx-auto">
        <input
          type="text"
          v-model="search"
          class="w-full rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 transition-all duration-200"
          style="background: rgba(66, 40, 21, 0.8); border: 2px solid #A56758; color: rgb(196, 164, 132);"
          placeholder="Search creatures..."
        />
        <svg class="absolute left-3 top-3.5 h-4 w-4" style="color: rgb(196, 164, 132);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <button
          v-if="search"
          @click="clearSearch"
          class="absolute right-3 top-3.5 transition-colors"
          style="color: rgb(196, 164, 132);"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="p-12 text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 mb-4 border-4 border-t-transparent" style="border-color: #CD9839; border-top-color: transparent;"></div>
      <p style="color: rgb(196, 164, 132);">Loading creatures...</p>
    </div>

    <!-- Creatures Grid -->
    <div v-else class="p-6">
        <!-- Results counter -->
        <div class="mb-4 text-center">
          <span style="color: rgb(196, 164, 132); opacity: 0.8;">
            Showing {{ creatures.length }} of {{ totalCount }} creatures
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          <div
            v-for="creature in creatures"
            :key="creature.name"
            @click="$emit('creature-selected', creature)"
            class="group relative rounded-xl p-5 cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg"
            style="background: rgba(66, 40, 21, 0.95); border: 2px solid rgba(165, 103, 88, 0.4);"
          >
            <!-- Creature Icon -->
            <div class="text-center mb-3">
              <span class="text-4xl block">{{ getCreatureTypeIcon(creature.size) }}</span>
            </div>

            <!-- Creature Name -->
            <h3 class="font-bold text-base mb-4 text-center leading-tight transition-colors line-clamp-2" style="color: #CD9839; text-shadow: 1px 1px 2px rgba(0,0,0,0.7);">
              {{ creature.name }}
            </h3>

            <!-- Stats Row -->
            <div class="flex justify-center items-center gap-2 mb-3">
              <!-- Hit Points -->
              <div class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border" style="background: rgba(165, 103, 88, 0.15); border-color: rgba(205, 151, 57, 0.4);">
                <img src="../assets/heart.png" alt="HP" class="w-4 h-4" />
                <span class="text-sm font-semibold" style="color: rgb(196, 164, 132);">
                  {{ creature.hit_points ? creature.hit_points.split(' ')[0] : '?' }}
                </span>
              </div>

              <!-- Armor Class -->
              <div class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border" style="background: rgba(165, 103, 88, 0.15); border-color: rgba(205, 151, 57, 0.4);">
                <img src="../assets/shield.png" alt="AC" class="w-4 h-4" />
                <span class="text-sm font-semibold" style="color: rgb(196, 164, 132);">
                  {{ creature.armor_class ? creature.armor_class.split(' ')[0] : '?' }}
                </span>
              </div>
            </div>

            <!-- Challenge Rating -->
            <div class="text-center mb-2">
              <span
                v-if="creature.challenge"
                class="inline-block px-3 py-1.5 rounded-lg text-sm font-bold border"
                style="background: rgba(165, 103, 88, 0.25); border-color: rgba(205, 151, 57, 0.6); color: #CD9839; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);"
              >
                CR {{ creature.challenge }}
              </span>
            </div>

            <!-- Size and Type -->
            <div class="text-center">
              <span class="text-sm font-medium uppercase tracking-wide" style="color: rgb(196, 164, 132); opacity: 0.9;">
                {{ creature.size ? creature.size.split(' ')[0] : '' }}
              </span>
            </div>

            <!-- Hover Effect Overlay -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" style="background: rgba(205, 151, 57, 0.1);"></div>
          </div>
        </div>

        <!-- Loading more indicator -->
        <div v-if="isLoadingMore" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-transparent mb-4" style="border-color: #CD9839; border-top-color: transparent;"></div>
          <p style="color: rgb(196, 164, 132); opacity: 0.8;">Loading more creatures...</p>
        </div>

        <!-- Load more button -->
        <div v-else-if="hasMore && creatures.length > 0" class="text-center py-8">
          <button
            @click="loadMoreCreatures"
            :disabled="isLoadingMore"
            class="px-8 py-4 rounded-xl border-3 font-bold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style="background: linear-gradient(135deg, rgba(66, 40, 21, 0.9) 0%, rgba(45, 24, 16, 0.9) 100%); border-color: #CD9839; color: #CD9839; text-shadow: 1px 1px 3px rgba(0,0,0,0.7); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);"
          >
            🗡️ Load More Creatures 🗡️
          </button>
        </div>

        <!-- No more results indicator -->
        <div v-else-if="!hasMore && creatures.length > 0" class="text-center py-8">
          <p style="color: rgb(196, 164, 132); opacity: 0.6;">
            End of results ({{ creatures.length }} creatures loaded)
          </p>
        </div>

        <!-- No Results Message -->
        <div v-if="creatures.length === 0 && !isLoading" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 mb-4" style="color: rgb(196, 164, 132); opacity: 0.6;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.441-1.2-5.653-3.031m0 0A7.975 7.975 0 016 9c0-4.418 3.582-8 8-8s8 3.582 8 8c0 1.042-.2 2.036-.566 2.969"></path>
          </svg>
          <p class="text-lg" style="color: rgb(196, 164, 132);">No creatures found</p>
          <p class="text-sm mt-1" style="color: rgb(196, 164, 132); opacity: 0.7;">Try adjusting your search terms</p>
        </div>
    </div>
  </div>
</template>