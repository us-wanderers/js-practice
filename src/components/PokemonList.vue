<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PokemonCard from './PokemonCard.vue';

const pokemons = ref<{ name: string; url: string }[]>([])
const loading = ref(true)
const error = ref('')

const fetchPokemons = async () => {
  try {
    loading.value = true
    error.value = ''

    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
    const data = await response.json()

    pokemons.value = data.results
  } catch (err) {
    error.value = 'Không thể tải dữ liệu Pokémon!'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleSelect = (pokemon: any) => {
  console.log('Pokémon được chọn:', pokemon.name)
}

onMounted(() => {
  fetchPokemons()
})
</script>

<template>
  <div class="pokemon-list">
    <p v-if="loading">Đang tải danh sách Pokémon...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div class="grid">
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        :url="pokemon.url"
        @select="handleSelect"
      />
    </div>
  </div>
</template>

<style scoped>

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.error {
  color: red;
}
</style>