<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import PokemonCard from './PokemonCard.vue';

const pokemons = ref<{ name: string; url: string }[]>([])
const loading = ref(true)
const error = ref('')
const currentUrl = ref('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
const nextUrl = ref<string | null>(null)
const prevUrl = ref<string | null>(null)


const fetchPokemons = async () => {
  try {
    loading.value = true
    error.value = ''

    const response = await fetch(currentUrl.value)
    const data = await response.json()

    pokemons.value = data.results
    nextUrl.value = data.next
    prevUrl.value = data.previous
  } catch (err) {
    error.value = 'Không thể tải dữ liệu Pokemon!'
    console.error(err)
  } finally {
    loading.value = false
  }
}

watch(currentUrl, () => {
  fetchPokemons()
})

const handleSelect = (pokemon: any) => {
  console.log('Pokemon được chọn:', pokemon.name)
}

onMounted(() => {
  fetchPokemons()
})
</script>

<template>
  <div class="pokemon-list">
    <p v-if="loading">Đang tải danh sách Pokemon...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div class="grid">
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        :url="pokemon.url"
        @select="handleSelect"
      />
    </div>

    <div class="pagination">
      <button :disabled="!prevUrl || loading" @click="currentUrl = prevUrl || currentUrl">Previous</button>
      <button :disabled="!nextUrl || loading" @click="currentUrl = nextUrl || currentUrl">Next</button>
      </div>
  </div>
</template>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 12px;
}
button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: #3b82f6;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
button:hover:not(:disabled) {
  background-color: #2563eb;
}
</style>