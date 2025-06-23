<script setup>
const pokemon = defineProps(["name", "urlImg"])
</script>

<template>
	<div class="col-4">
		<div class="card p-3 mb-3 cardListPokemon">
			<p class="text-center"> {{name}} </p>
			<img 
			:src="urlImg" 
			class="card-img-top" 
			alt="..."
			height = 80
			> 
		</div>
	</div> 
</template>

<style scoped>
.cardListPokemon {
  background: radial-gradient(
    circle,
    rgba(123, 115, 156, 1) 0%,
    rgba(146, 140, 255, 1) 22%,
    rgba(114, 114, 176, 1) 48%,
    rgba(41, 177, 226, 1) 81%,
    rgba(19, 62, 69, 1) 100%
  );
  transition: all 0.3s ease;
}

.cardListPokemon:hover {
  background: radial-gradient(
    circle,
    rgba(64, 156, 255, 1) 0%,
    rgba(33, 127, 222, 1) 50%,
    rgb(37, 79, 152) 100%
  );
  transform: scale(1.03);
  box-shadow: 0px 4px 15px rgba(0,0,0,.3);
}

.cardListPokemon img:hover {
  padding: 0.2rem;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>