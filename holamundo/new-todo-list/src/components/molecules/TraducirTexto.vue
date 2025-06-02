<script lang="ts" setup>
import {  computed, useSlots, onMounted, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import type { I18n as I18nType } from 'vue-i18n'
// import {TraductorManager} from '@/composables/traductorManager'
const slots = useSlots()
const { messages, locale } = useI18n()
const props = defineProps<{
	page: string
	label: string
	raiz?: string
}>()

const i18nInstance = inject<I18nType | null>('i18n', null)
const translate = (key: string) => {
  //  Si aún no existía, devolvemos la misma key (o un string vacío)
  if (!i18nInstance) return ''
  return i18nInstance.global.t(key)
}
// const loading = inject('loadingTraduccion') as Ref<boolean>

const tieneTraduccion = computed<boolean>(() => {
	// 1. Obtenemos el objeto de esa página/idioma
	const msgsPorIdioma = (messages.value as Record<string, object>)[locale.value] as Record<string, object> | undefined
	const paginaObj = msgsPorIdioma ? (msgsPorIdioma[props.page] as Record<string, string> | undefined) : undefined

	// 2. Verificamos que exista y que contenga la clave 'label'
	return !!(paginaObj && Object.prototype.hasOwnProperty.call(paginaObj, props.label))
})

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

// const haLogueado = ref<boolean>(false)

onMounted( async () => {
	// usar composable TraductorManager para hacer 1 petición a Api por página para el get y 1 petición por pagina-label para el insert
	// const promesa = await TraductorManager.getPromesa(props.page)
	// if(promesa){

	// }
	// Si carga promesa pero no existe el label se hace insert al api con defaultText
	// revisar si tiene traducción o promesa

})
// watch(
// 	[tieneTraduccion, () => locale.value, () => props.page, () => props.label],
// 	([actualTiene, nuevaLocale, nuevaPage, nuevaLabel]) => {
// 		if (!actualTiene && !haLogueado.value) {
// 			// console.log(
// 			// 	`Guardando traducción por defecto para '${props.label}' en '${locale.value}.${props.page}':`,
// 			// 	defaultText.value || '<slot vacío o no-texto>'
// 			// )
// 			TraductorManager.insertTraduccion(props.page, props.label, defaultText.value)
// 			haLogueado.value = true // no funciona, repite los inserts
// 		}
// 		// Si luego aparece la traducción (o cambia page/label a algo que sí existe), reseteamos el flag
// 		if (actualTiene) {
// 			haLogueado.value = false
// 		}
// 	},
// 	{ immediate: true }
// )

</script>

<template>
	<template v-if="!i18nInstance">
		<!-- Hacer que muestre un esqueleto mientras carga -->
		<p>Cargando con skeleton ...</p>
	</template>
	<template v-else>
		<template v-if="tieneTraduccion">
			<component v-if="raiz" :is="raiz" v-html="translate(`${page}.${label}`)" />
			<template v-else>{{ translate(`${page}.${label}`) }}</template> 
		</template>
		<template v-else>
			<slot> </slot>
		</template>
	</template>
</template>