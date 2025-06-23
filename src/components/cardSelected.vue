<script setup>
let pokemon = defineProps(["name", "xp", "height", "image"])
</script>

<template>
  <div class="card cardSelected " style="width: 35rem;">
	<img
	:src="image"
	alt="name"
	height=300
	class="card-img-top"
	>
	<div class="card-body">
		<h5 class="card-title text-center">{{name}}</h5>
		<hr>
		<div class="row">
			<section class="col">
				<strong> XP: </strong>
				<span>{{xp}}</span>
			</section>

			<section class="col">
				<strong> Height: </strong>
				<span>{{height}}</span>
			</section>
		</div>
	</div>
  </div>
</template>

<style scoped>
.cardSelected {
	background: #5b99b0;
	background: radial-gradient(circle, rgba(91, 153, 176, 1) 0%, rgba(62, 156, 145, 1) 22%, rgba(87, 199, 133, 1) 57%, rgba(235, 197, 192, 1) 84%, rgba(24, 242, 50, 1) 100%);
}
</style>