<script lang="ts" setup>
import HelloWorld from '@/components/atoms/HelloWorld.vue';
import TraducirTexto from '@/components/molecules/TraducirTexto.vue';
import { IDIOMAS } from '@/constantes/constantes';
import { ref } from 'vue'
import type { Idioma } from '@/types';
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router';


const router = useRouter()

const { locale } = useI18n()

const idioma = ref<Idioma>(document.documentElement.lang as Idioma)

function cambiaIdioma() {
	const currentPath = router.currentRoute.value.fullPath
	const currentLang = IDIOMAS.find(sub => currentPath.includes(`/${sub}`))

	const newPath = currentPath.replace(`/${currentLang}`, `/${idioma.value}`)

	locale.value = idioma.value
	document.documentElement.lang = idioma.value
	router.push(newPath)
}

</script>

<template>
	<div class="wrapper">
		<HelloWorld :msg="$t('nav.web')" />

		<nav>
			<RouterLink :to="`/${idioma}`">
				<TraducirTexto page="nav" label="inicio" raiz="div">
					<span>Inicio</span>
				</TraducirTexto>
			</RouterLink>
			<RouterLink :to="`/${idioma}/about`">About</RouterLink>
			<RouterLink :to="`/${idioma}/nueva`">Nueva</RouterLink>
		</nav>
		<nav>
			<select v-model="idioma" @change="cambiaIdioma">
				<option value="es">Español</option>
				<option value="en">English</option>
			</select>
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