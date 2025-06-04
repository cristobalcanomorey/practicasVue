<script lang="ts" setup>
import HomeTemplate from "@/components/templates/HomeTemplate.vue";
import { mountTraducciones } from '@/composables/traductorManager'
import { onMounted, ref, provide, watch } from "vue";
import { getPaginas } from "@/services/generalApi";
import { IDIOMAS } from "@/constantes/constantes";
import type { Idioma } from "@/types";

console.log("[HomeView] Arrancando setup...");
const manager = mountTraducciones()
const currentPage = 'Home';
// const i18nInstance = ref<I18nType | null>(null) 
// const t = ref<(key: string) => string>(() => '') // función dummy mientras carga
const loading = ref<boolean>(true)
// record o null

// console.log("[HomeView] manager setup:", manager.value);

// provide('loadingTraduccion', loading)
// provide('i18n', i18nInstance)
// provide('translate', t)
// provide('messages', messages)




onMounted(async () => {
	console.log('cargando async')
	//Labels asociados a la página home
	// const paginas = (await getPaginas()) as { id: number; pagina: string }[];
	// console.log('paginas', paginas)

	// const messages: Record<Idioma, Record<string, object>> = {} as Record<Idioma, Record<string, object>>;
	const promises = []
	manager.value.getTraduccionesDeComponentes(manager.value.getIdioma(), currentPage);
	const respuestaApi = manager.value.getApiTraducciones(manager.value.getIdioma(), currentPage)
	promises.push(respuestaApi)


	const response = ref(await Promise.all(promises))
	watch(response, (newResponse) => {
		// console.log('watch response', newResponse)
		manager.value.appendTraducciones(newResponse) //cuando responde la API, añade las traducciones
		// console.log('messages', manager.value.messages.value)
		// console.log('nuevas', manager.value.nuevasT.value)
	}, { immediate: true })
	//Aquí ya ha recorrido todos los componentes TraducirTexto y ha recogido las nuevas traducciones
	// manager.value.limpiaNuevasT() //Elimina las nuevas
	// console.log('response en ', currentPage, response)
	// console.log('messages', JSON.stringify(manager.value.messages.value))
	// console.log('nuevas', JSON.stringify(manager.value.nuevasT.value))

	// const localI18n = createI18n({
	// 	legacy: false,
	// 	locale: import.meta.env.VITE_DEFAULT_LOCALE, // ej. "es" o "en"
	// 	fallbackLocale: 'es',
	// 	messages: messages.value,
	// });

	// i18nInstance.value = localI18n as I18nType;
	// // Ahora t() será la función de traducción
	// t.value = localI18n.global.t;
	// loading.value = false;

	// console.log('Datos actualizados? ', typeof i18nInstance.value?.global.t)
})

</script>

<template>
	<HomeTemplate />

</template>
