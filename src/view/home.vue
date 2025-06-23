<script setup>
import listPokemon from "../components/listPokemon.vue"
import cardSelected from "../components/cardSelected.vue"
import {onMounted, reactive, ref, computed} from 'vue'
import cardSelectedVue from "../components/cardSelected.vue";

let urlImg = ref("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/")
let pokemons = reactive(ref());
let searchPokemonField = ref("") 
let selectedPokemon = reactive(ref())

onMounted(()=>{
	fetch("https://pokeapi.co/api/v2/pokemon?offset=20&limit=20")
	.then(res => res.json()) 
	.then(res => {
		pokemons.value = res.results
	});
})

const pokemonsFiltered = computed(() =>{
	if (pokemons.value && searchPokemonField.value){
		return pokemons.value.filter(pokemon=>
			pokemon.name.toLowerCase().includes(searchPokemonField.value.toLowerCase())
		)
	} 
	return pokemons.value;
})

const selectedPoke = async (pokemon) => {
	await fetch(pokemon.url)
	.then(res => res.json())
	.then(res => selectedPokemon.value = res) 
	
	console.log(selectedPokemon.value)
}

</script>

<template>
	<main>
		<div class="container">

			<div class="row mt-4">
				<div class="col-sm-12 col-md-6">
					<cardSelected
					:name="selectedPokemon?.name"
					:xp="selectedPokemon?.base_experience"
					:height="selectedPokemon?.height"
					:image="selectedPokemon?.sprites.other.dream_world.front_default"
					/>
				</div>
				<div class="col-sm-12 col-md-6 cardList">
					<div class="card"> 
						<div class="card-body row">
							<div class="mb-3">

								<label 
								for="searchPokemonField" class="form-label"
								>Search
								</label>

								<input 
								v-model="searchPokemonField"
								type="text"
								class="form-control" id="searchPokemonField" placeholder="Enter Pokemon Name"
								>

							</div>
							<listPokemon 
							v-for="pokemon in pokemonsFiltered"
							:key="pokemon.name"
							:name="pokemon.name"
							:urlImg="urlImg + pokemon.url.split('/')[6] + '.svg'"
							@click="selectedPoke(pokemon)"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>


<style scoped>
.cardList {
	max-height: 600px;
	overflow-y: scroll;
	overflow-x: scroll;
}
</style>