<script setup lang="ts">
import { ref, onMounted } from 'vue'
  
const props = defineProps<{
	url: string
}>()
  
const emit = defineEmits<{
	(e: 'select', data: any): void
}>()
  
const detail = ref<any>(null)
  
const fetchDetail = async () => {
	try {
	  const res = await fetch(props.url)
	  const data = await res.json()
	  detail.value = data
	} catch (err) {
	  console.error('Lỗi khi load chi tiết Pokémon:', err)
	}
}
  
const handleClick = () => {
	if (detail.value) {
	  emit('select', detail.value)
	}
}
  
onMounted(() => {
	fetchDetail()
})
</script>

<template>
	<div class="pokemon-card" @click="handleClick">
	  <img :src="detail?.sprites.front_default" alt="pokemon image" />
	  <p>{{ detail?.name }}</p>
	</div>
</template>

  
<style scoped>
.pokemon-card {
	display: inline-block;
	border: 1px solid #ccc;
	border-radius: 12px;
	padding: 7px;
	margin: 7px;
	width: 150px;
	text-align: center;
	cursor: pointer;
	transition: 0.2s;
}

.pokemon-card:hover {
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}
.pokemon-card img {
	width: 96px;
	height: 96px;
}
</style>
  