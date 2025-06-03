// src/composables/useLoadLocale.ts
import { ApiTraductor } from '@/services/translationApi'
import { objectHasPath, diffKeys, haveSameKeysDeep, getDeepMissing, mergeDeep } from '@/composables/helpers';
import type { AnyObject, Idioma } from '@/types';
import { inject, provide, ref, type Ref } from 'vue';
import type { Traducciones } from '@/types.ts'
import { IDIOMAS } from '@/constantes/constantes';


export function mountTraducciones() {
	const manager = ref<TraductorManager>(new TraductorManager())
	provide('TraductorManager', manager)
	return manager
}

export function useTraducciones() {
	const manager = inject("TraductorManager") as Ref<TraductorManager>
	return manager
}


class TraductorManager  {

	private messages = ref<Traducciones>({} as Traducciones)
	//recoge los mensajes de los slots de cada componente TraducirTexto
	private originales = ref<Traducciones>({} as Traducciones)
	public cargandoTraducciones = ref<boolean>(false)
	public idioma = ref<Idioma>(import.meta.env.VITE_DEFAULT_LOCALE)
	private api

	public constructor() {
		for (const idioma of IDIOMAS) {
			this.messages.value[idioma] = {}
		}
		this.api = new ApiTraductor(this.idioma.value)
	}

	public guardaOriginal(idioma: Idioma, page: string, label: string, original: string) {
		// mete dentro de originales
		let textoOriginal = {
			[idioma]: {
				[page]: {
					[label]: original
				}
			}
		} as Traducciones
		let originalesCompleto = mergeDeep(this.originales.value, textoOriginal)
		this.originales.value = originalesCompleto
	}

	public existeTraduccion(idioma: Idioma, page: string, label: string): boolean {
		// messages.value['idioma']['page']['label'] existe?
		const langs = this.messages.value;
		if (!langs || typeof langs !== "object") return false;

		const langObj = langs[idioma];
		if (!langObj || typeof langObj !== "object") return false;

		const pageObj = langObj[page];
		if (!pageObj || typeof pageObj !== "object") return false;

		return label in pageObj;
	}

	public getTraduccion(idioma: Idioma, page: string, label: string, defecto: string | null = null): string {
		/**
		 * Si la traducción existe en messages la devuelve en su idioma
		 * 
		 * Si no existe hace devuelve el defecto
		 */
		const valor = this.messages.value[idioma]?.[page]?.[label]
		if (typeof valor === "string") {
			return valor;
		}
		if(defecto === null){
			console.warn('Hay que poner texto en el slot para que se muestre por defecto y se pueda hacer su insert en la api')
		}
		return defecto ?? ''
	}

	private async getApiTraducciones(idioma: Idioma, page: string): Promise<Traducciones> {
		/**
		 */
		this.cargandoTraducciones.value = true

		// Llama a la API
		let trad = this.api.getTraduccionesPaginaAsync(idioma, page)
		return trad 
	}

	public async getTraducciones(idioma: Idioma, page: string): Promise<Traducciones> {
		console.log('Obtiene las traducciones en ' + idioma + ' de: ' + page)

		/**
		 * Si la página existe en messages le pasa messages
		 */
		if (objectHasPath(this.messages.value, `${idioma}.${page}`)) {
			return this.messages.value
		}

		/**
		 * Si no existe lo pregunta a la api
		 */
		let respuesta = await this.getApiTraducciones(idioma, page)
		this.cargandoTraducciones.value = false
		this.messages.value = respuesta

		/**
		 * Si lo que encuentra la api no coincide con originales
		 * 		por cada originales que falten en la respuesta hace su insert a api
		 */
		let diferencia = getDeepMissing(this.messages.value, this.originales.value)
		if (Object.keys(diferencia).length !== 0) { //en originales hay más cosas que en el api
			this.setApiTraducciones(diferencia)
			// Después, fusionamos en messages solo las ramas faltantes
			this.messages.value = mergeDeep(this.messages.value, diferencia);
		}

		return diferencia as Traducciones


		// const promes = (this.prom as Record<string, object>)[page] as Record<string, object> | undefined;
		// // console.log("getPromesa", page, promes);
		// if (promes) {
		// 	return promes;
		// }
		// const paginaTrad = await Traductor.getTraduccionesPaginaAsync(idioma, page) as Promise<Record<string, string>>;
		// this.setPromesaPagina(page, paginaTrad);
		// const result: Record<string, object> = {};
		// result[page] = paginaTrad;
		// return result;
	}

	// async setTraduccionesPagina(page: string, traducciones: Promise<Record<string, string>> | Record<string, string>) {
	// 	// if (traducciones instanceof Promise) {
	// 	// 	traducciones = await traducciones;
	// 	// }
	// 	// Object.keys(traducciones).forEach((key) => {
	// 	// 	const value = traducciones[key] as string;
	// 	// 	if (typeof value === 'string' && value !== null) {
	// 	// 		TraductorManager.setTraduccion(page, key, value);
	// 	// 	}
	// 	// });
	// }

	private async setApiTraducciones(trad: Partial<Traducciones>) {
		let promises: Promise<unknown>[] = []
		for (const page of Object.keys(trad)) {
			const pageObj = trad[page as keyof Partial<Traducciones>];

			// Si existe un objeto de etiquetas para esa página…
			if (pageObj && typeof pageObj === "object") {
				// Recorremos cada "label" dentro de esa página
				for (const label of Object.keys(pageObj as AnyObject)) {
					const value = (pageObj as AnyObject)[label] as string;

					// Aquí llamamos a tu método (ahora solo hace console.log, 
					// luego insertará en la base de datos)
					const promesa = this.setApiTraduccion(page, label, value);
					this.setTraduccion(page, label, value)
					promises.push(promesa)
				}
			}
		}
		await Promise.all(promises)
	}

	private async setApiTraduccion(page: string, label: string, value: string) {

		const idioma = 'es' as Idioma
		/**
		 * hace insert en la API
		 */
		console.log('En construcción...')
		console.log(`Haciendo insert de: Página = ${page}, Label = ${label}, Value = ${value}`)

		this.api.insertTraduccion(this.idioma.value, page,label,value)
		// const p = (this.prom as Record<string, object>)[page] as Record<string, string> | undefined;
		// if (!p) {
		// 	const l = { key: label, value: value } as Record<string, string> | undefined;
		// 	// Llamada a Api para guardar la traducción
		// 	console.log("setPromesa", page);
		// 	Traductor.insertTraduccion(page, label, value);
		// }
	}

	private setTraduccion(page: string, label: string, value: string) {
		/**
		 * Guarda la traducción en messages
		 */
	}
}

// export function useLoadLocale() {
//   // pull the global composer methods & refs directly
//   const {
//     locale,
//     availableLocales,
//     setLocaleMessage,
//   } = useI18n({ useScope: 'global' })

//   const loading = ref(false)
//   const error   = ref<Error | null>(null)

//   async function loadLocale(newLocale: string) {
//     // if we’ve already loaded this locale, just switch
//     if (availableLocales.value.includes(newLocale)) {
//       locale.value = newLocale
//       return
//     }

//     loading.value = true
//     error.value   = null

//     try {
//       // fetch your translations from your API
//       const messages = await fetchTranslations(newLocale)
//       // register them with vue-i18n
//       setLocaleMessage(newLocale, messages)
//       // switch active locale
//       locale.value = newLocale
//     } catch (e: any) {
//       error.value = e
//     } finally {
//       loading.value = false
//     }
//   }

//   return { loading, error, loadLocale }
// }
