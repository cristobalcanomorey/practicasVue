<script lang="ts" setup>
import HelloWorld from '@/components/atoms/HelloWorld.vue';
import TraducirTexto from '@/components/molecules/TraducirTexto.vue';
import { IDIOMAS } from '@/constantes/constantes';
import { onMounted, ref, watch } from 'vue'
import type { Idioma } from '@/types';
import { useRouter } from 'vue-router';
import { mountTraducciones } from '@/composables/traductorManager';
// import { useTraducciones } from '@/composables/traductorManager';
const manager = mountTraducciones()

const router = useRouter()
const currentPage = 'NavBar';

// const manager = useTraducciones()

// manager.value.labels.value = ['']

const idioma = ref<Idioma>(document.documentElement.lang as Idioma)

function cambiaIdioma() {
	const currentPath = router.currentRoute.value.fullPath
	const currentLang = IDIOMAS.find(sub => currentPath.includes(`/${sub}`))

	const newPath = currentPath.replace(`/${currentLang}`, `/${idioma.value}`)

	document.documentElement.lang = idioma.value
	router.push(newPath)
	manager.value.setIdioma(idioma.value)
}

onMounted(async () => {
	const promises = []
	manager.value.getTraduccionesDeComponentes(manager.value.getIdioma(),currentPage);
	const respuestaApi = manager.value.getApiTraducciones(manager.value.getIdioma(), currentPage)
	promises.push(respuestaApi)
	

	const response = ref(await Promise.all(promises) )
	watch(response, (newResponse) => {
		console.log('watch response', newResponse)
		manager.value.cargandoTraducciones.value = false
		// porqué no se actualiza el manager?
		manager.value.appendTraducciones(newResponse) //cuando responde la API, añade las traducciones
		console.log('messages', manager.value.messages.value)
		console.log('nuevas', manager.value.nuevasT.value)
	}, { immediate: true })
	
	// manager.value.appendTraducciones(response)
	// for (const res of response) {
	// 	if (res) {
	// 	}
	// }
	// manager.value.limpiaNuevasT()
});

</script>

<template>
	<div class="wrapper">
		<HelloWorld msg="cosa" />

		<nav>
			<!-- <RouterLink :to="`/${idioma}`">
				<TraducirTexto :page="currentPage" label="prueba" raiz="div">
					<span>NoCambia</span>
				</TraducirTexto>
			</RouterLink>
			<RouterLink :to="`/${idioma}`">
				<TraducirTexto :page="currentPage" label="inicio2">
					Ya existe
				</TraducirTexto>
			</RouterLink> -->
			<RouterLink to="home">
				<TraducirTexto :page="currentPage" label="inicio" >
					Inicio
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