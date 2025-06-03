<script lang="ts" setup>
import { computed, useSlots, onMounted, inject, watch } from 'vue'
import type { I18n as I18nType } from 'vue-i18n'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Idioma } from '@/types'
import { createI18n } from 'vue-i18n'
import { useTraducciones } from '@/composables/traductorManager'
// import {TraductorManager} from '@/composables/traductorManager'
const slots = useSlots()

const manager = useTraducciones()


// const { messages, locale } = useI18n()
const props = defineProps<{
	page: string
	label: string
	raiz?: string
}>()

const existeTraduccion = computed(()=>manager.value.existeTraduccion(manager.value.idioma.value, props.page, props.label))

// const i18nInstance = inject<Ref<I18nType | null>>(
// 	'i18nInstance',
// 	ref(null)
// )!
// const loadingTraduccion = inject<Ref<boolean>>(
// 	'loadingTraduccion',
// 	ref(true)
// )!

// const t = ref<(key: string) => string>((key) => '')

// const messages = inject<Ref<object>>(
// 	'messages',
// 	ref({} as Record<Idioma, Record<string, object>>)
// )

// const funcTrad = computed(() => {
// 	if (Object.keys(messages.value).length === 0) {
// 		return () => 'no ha cargado...'
// 	} else {
// 		// newMessages.value = messages.value as 
// 		const localI18n = createI18n({
// 			legacy: false,
// 			locale: import.meta.env.VITE_DEFAULT_LOCALE, // ej. "es" o "en"
// 			fallbackLocale: 'es',
// 			messages: messages.value as Record<Idioma, Record<string, object>>,
// 		});

// 		i18nInstance.value = localI18n as I18nType;
// 		// Ahora t() será la función de traducción
// 		// loading.value = false;
// 		return localI18n.global.t
// 	}
// })

// const translate = inject<Ref<(key: string) => string>>(
// 	'translate',
// 	ref((key: string) =>{
// 		if (!i18nInstance.value) return ''
// 	return i18nInstance.value.global.t(key)
// 	})
// )

// const traducir = computed(() => {
// 	if (loadingTraduccion.value || i18nInstance.value === null) {
// 		return (key: string) => key + ' no va'
// 	} else {
// 		return i18nInstance.value.global.t
// 	}
// })

// const translate = (key: string) => {
// 	//  Si aún no existía, devolvemos la misma key (o un string vacío)
// 	if (!i18nInstance.value) return ''
// 	return i18nInstance.value.global.t(key)
// }
// const loading = inject('loadingTraduccion') as Ref<boolean>

// const tieneTraduccion = computed<boolean>(() => {
// 	console.log('no carga')
// 	if (loadingTraduccion.value) {
// 		return false
// 	}
// 	return true
// 	if (i18nInstance.value === null) {
// 		return false
// 	}
// 	console.log('ha cargado')
// 	const { messages, locale } = i18nInstance.value.global as {
// 		messages: Record<string, any>
// 		locale: Ref<string>
// 	}
// 	console.log(i18nInstance)
// 	if (!messages || !locale) {
// 		return false
// 	}
// 	// 1. Obtenemos el objeto de esa página/idioma
// 	const idiomaActual = locale.value
// 	const msgsPorIdioma = (messages.value as Record<string, object>)[idiomaActual] as Record<string, object> | undefined
// 	const paginaObj = msgsPorIdioma ? (msgsPorIdioma[props.page] as Record<string, string> | undefined) : undefined

// 	// 2. Verificamos que exista y que contenga la clave 'label'
// 	return !!(paginaObj && Object.prototype.hasOwnProperty.call(paginaObj, props.label))
// })

const defaultText = computed<string>(() => {
	if (!slots.default) {
		return ''
	}
	const nodos = slots.default()
	if (nodos.length === 0) {
		return ''
	}
	const primer = nodos[0]
	if (typeof primer.children === 'string') {
		return primer.children
	}
	return ''
})

onMounted(()=>{
	manager.value.guardaOriginal(manager.value.idioma.value, props.page, props.label, defaultText.value)
})


// const cargando = computed(() => {
// 	console.log(typeof loadingTraduccion)
// 	return loadingTraduccion
// })



</script>

<template>
	<template v-if="manager.cargandoTraducciones">
		<!-- Hacer que muestre un esqueleto mientras carga -->
		<p>Cargando con skeleton ...</p>
	</template>
	<template v-else>
		<!-- {{ traducir(`${page}.${label}`) }} -->
		<template v-if="existeTraduccion">
			<component v-if="raiz" :is="raiz" v-html="manager.getTraduccion(manager.idioma.value,page,label,defaultText)" />
			<template v-else>{{ manager.getTraduccion(manager.idioma.value,page,label,defaultText) }}</template>
		</template>
		<template v-else>
			<!-- por defecto pilla lo del slot -->
			<slot> </slot> 
		</template>
	</template>
</template>