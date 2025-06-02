<script lang="ts" setup>
import HomeTemplate from "@/components/templates/HomeTemplate.vue";
import { TraductorManager } from '@/composables/traductorManager'
import { onMounted, ref, provide } from "vue";
import { getPaginas } from "@/services/generalApi";
import { IDIOMAS } from "@/constantes/constantes";
import type { Idioma } from "@/types";
import { createI18n } from 'vue-i18n'

const i18nInstance = ref()
const t = ref<(key: string) => string>(() => '') // función dummy mientras carga
const loading = ref<boolean>(true)

provide('loadingTraduccion', loading)

onMounted(async () => {
	console.log('cargando async')
	const paginas = (await getPaginas()) as { id: number; pagina: string }[];

	const messages: Record<Idioma, Record<string, object>> = {} as Record<Idioma, Record<string, object>>;

	for (const idioma of IDIOMAS) {
		messages[idioma] = {};
		for (const pag of paginas) {
			const promesa = (await TraductorManager.getPromesa(idioma, pag.pagina)) as Record<string, object>;
			messages[idioma][pag.pagina] = promesa[pag.pagina] || {}
		}
	}

	const localI18n = createI18n({
		legacy: false,
		locale: import.meta.env.VITE_DEFAULT_LOCALE, // ej. "es" o "en"
		fallbackLocale: 'es',
		messages,
	});

	i18nInstance.value = localI18n;
	// Ahora t() será la función de traducción
	t.value = localI18n.global.t;
	loading.value = false;
	provide('i18n', i18nInstance.value)
})

</script>

<template>
	<HomeTemplate />

</template>
