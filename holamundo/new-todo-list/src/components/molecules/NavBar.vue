<script lang="ts" setup>
import HelloWorld from '@/components/atoms/HelloWorld.vue';

const idioma = document.documentElement.lang
</script>

<template>
	<div class="wrapper">
		<HelloWorld msg="You did it!" />

		<nav>
			<RouterLink :to="`/${idioma}`">Home</RouterLink>
			<RouterLink :to="`/${idioma}/about`">About</RouterLink>
			<RouterLink :to="`/${idioma}/nueva`">Nueva</RouterLink>
		</nav>
	</div>
</template>

<style scoped>
nav {
	width: 100%;
	font-size: 12px;
	text-align: center;
	margin-top: 2rem;
}

nav a.router-link-exact-active {
	color: var(--color-text);
}

nav a.router-link-exact-active:hover {
	background-color: transparent;
}

nav a {
	display: inline-block;
	padding: 0 1rem;
	border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
	border: 0;
}

@media (min-width: 1024px) {
	.wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}

	nav {
		text-align: left;
		margin-left: -1rem;
		font-size: 1rem;

		padding: 1rem 0;
		margin-top: 1rem;
	}
}
</style>