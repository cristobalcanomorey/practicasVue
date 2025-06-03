<script lang="ts" setup>
import HomeTemplate from "@/components/templates/HomeTemplate.vue";
import { mountTraducciones } from '@/composables/traductorManager'
import { onMounted, ref, provide } from "vue";
import { getPaginas } from "@/services/generalApi";
import { IDIOMAS } from "@/constantes/constantes";
import type { Idioma } from "@/types";
import { createI18n } from 'vue-i18n'
import type { I18n as I18nType } from 'vue-i18n'

const manager = mountTraducciones()
// const i18nInstance = ref<I18nType | null>(null) 
// const t = ref<(key: string) => string>(() => '') // función dummy mientras carga
const loading = ref<boolean>(true)
// record o null


// provide('loadingTraduccion', loading)
// provide('i18n', i18nInstance)
// provide('translate', t)
// provide('messages', messages)




onMounted(async () => {
	console.log('cargando async')
	const paginas = (await getPaginas()) as { id: number; pagina: string }[];

	// const messages: Record<Idioma, Record<string, object>> = {} as Record<Idioma, Record<string, object>>;

	let promises = []
	for (const idioma of IDIOMAS) {
	
		//promise.all
		for (const pag of paginas) {
			const promesa = manager.value.getTraducciones(idioma, pag.pagina);
			//crear nuevo messages
			promises.push(promesa)
		}
	}

	const response = await Promise.all(promises) 

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
