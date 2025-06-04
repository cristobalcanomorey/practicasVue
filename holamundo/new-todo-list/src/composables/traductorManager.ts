// src/composables/useLoadLocale.ts
import { ApiTraductor } from '@/services/translationApi'
import { objectHasPath, filtrarNuevasTraduccionesNoExistentes } from '@/composables/helpers';
import type { AnyObject, Idioma, TraduccionItem } from '@/types';
import { inject, provide, shallowRef, isRef, ref, type Ref, watch } from 'vue';
import type { Traducciones, NuevasTraducciones } from '@/types.ts'
import { IDIOMAS } from '@/constantes/constantes';


export function mountTraducciones() {
	//Parece ser que con ref normal se sacan los value fuera de los refs del objeto TraductorManager y pierde la reactividad
	//Por eso se usa shallowRef, para que no se pierda la reactividad de los refs dentro de TraductorManager
	const manager = shallowRef<TraductorManager>(new TraductorManager())
	provide('TraductorManager', manager)
	return manager
}

export function useTraducciones() {
	const manager = inject("TraductorManager") as Ref<TraductorManager>
	if (!manager) {
		throw new Error("TraductorManager no fue proporcionado")
	}
	return manager
}


class TraductorManager {
	public idioma: Ref<Idioma> = ref(document.documentElement.lang as Idioma)

	public idiomasBuscados: Ref<Idioma[]> = ref([]) // Aquí se guardan los idiomas que se han buscado en la API
	private deLaApi: Ref<TraduccionItem[]> = ref([] as TraduccionItem[]) // Aquí se guardan las traducciones obtenidas de la API
	public messages = ref<TraduccionItem[]>([] as TraduccionItem[]) // Aquí se guardan las traducciones obtenidas de la API
	//recoge los mensajes de los slots de cada componente TraducirTexto
	public nuevasT = ref<NuevasTraducciones>([] as NuevasTraducciones)
	public cargandoTraducciones: Ref<boolean> = ref(false)
	// Los labels que se usan en la página actual
	public labelsRelevantes = ref<string[]>([])
	private api

	public constructor() {
		// console.log(
		// 	"[TraductorManager.constructor] document.documentElement.lang =",
		// 	document.documentElement.lang
		// );
		// console.log("[TraductorManager] nueva instancia creada:", this);
		this.setIdioma(document.documentElement.lang as Idioma)


		// for (const idioma of IDIOMAS) {
		// 	this.messages.value[idioma] = {}
		// }
		this.api = new ApiTraductor()

	}

	public getIdioma(): Idioma {
		// console.log("[getIdioma] this.idioma (ref) =", this.idioma);
		return this.idioma.value
	}
	public setIdioma(nuevo: Idioma) {
		if (isRef(this.idioma)) {
			this.idioma.value = nuevo;
		} else {
			// En caso de que Vue ya lo envolviera a “string”, lo restauramos:
			this.idioma = ref(nuevo);
		}
		this.idiomasBuscados.value.push(nuevo);
		// console.log("[setIdioma] ahora this.idioma.value =", this.idioma.value);
	}

	// public limpiaNuevasT(){
	// 	console.log('Limpia nuevas traducciones', this.nuevasT.value, this.messages.value)
	// 	for(const nueva of this.nuevasT.value) {
	// 		// Si la traducción ya existe en messages, la eliminamos de nuevasT
	// 		if (this.existeTraduccion(nueva.idioma, nueva.page, nueva.label)) {
	// 			console.log('Eliminando traducción existente:', nueva)
	// 			this.nuevasT.value = this.nuevasT.value.filter(t => t !== nueva)
	// 		}
	// 	}
	// }

	public guardaNueva(idioma: Idioma, page: string, label: string, original: string) {
		// mete dentro de originales
		const nuevaTraduccion = {
			idioma: idioma,
			page: page,
			label: label,
			traduccion: original
		} as TraduccionItem

		this.nuevasT.value.push(nuevaTraduccion)
		if (!this.existeTraduccion(idioma, page, label)) {
			// console.log('en ', this.messages.value, ' no existe, se guarda nueva traducción:', nuevaTraduccion)
			this.messages.value.push(nuevaTraduccion);
		}
	}

	public existeTraduccion(idioma: Idioma, page: string, label: string): boolean {
		// messages.value['idioma']['page']['label'] existe?
		// const langs = this.messages.value 
		// if (!langs || typeof langs !== "object") return false;

		// const langObj = langs[idioma] 
		// if (!langObj || typeof langObj !== "object") return false;

		// const pageObj = langObj[page] 
		// if (!pageObj || typeof pageObj !== "object") return false;

		// const key = label.trim();
		// return Object.prototype.hasOwnProperty.call(pageObj, key);
		return this.messages.value.some(
			item =>
				item.idioma === idioma &&
				item.page === page &&
				item.label === label
		);
	}

	public getTraduccion(idioma: Idioma, page: string, label: string, defecto: string | null = null): string {
		/**
		 * Si la traducción existe en messages la devuelve en su idioma
		 * 
		 * Si no existe devuelve el defecto
		 */
		// const valor = this.messages.value[idioma]?.[page]?.[label]
		// if (typeof valor === "string") {
		// 	return valor;
		// }
		const response = this.messages.value.find(
			item => item.idioma === idioma && item.page === page && item.label === label
		);
		if (response) {
			// console.log(`Traducción encontrada: ${response.traduccion}`);
			return response.traduccion;
		}
		if (defecto === null) {
			console.warn('Hay que poner texto en el slot para que se muestre por defecto y se pueda hacer su insert en la api')
		}
		return defecto ?? ''
	}

	public async getApiTraducciones(idioma: Idioma, page: string): Promise<TraduccionItem[]> {
		/**
		 */
		this.cargandoTraducciones.value = true

		// Llama a la API
		const trad = this.api.getTraduccionesPaginaAsync(idioma, page)
		return trad
	}

	public getTraduccionesDeComponentes(idioma: Idioma, page: string): TraduccionItem[] {
		console.log('Obtiene las traducciones de: ' + page);
		this.cargandoTraducciones.value = true;

		/**
		 * Si la página existe en messages le pasa messages
		 */
		if (objectHasPath(this.messages.value, `${this.idioma.value}.${page}`)) {
			this.cargandoTraducciones.value = false;
			return this.messages.value;
		}

		/**
		 * Si no existe lo pregunta a la api
		 */
		// const respuesta = await this.getApiTraducciones(idioma, page); 

		// for (const item of respuesta) {
		//     if(item) {
		//         item.idioma = idioma; // Aseguramos que cada item tenga el idioma
		//         this.messages.value.push(item);
		//     }
		// }

		/**
		 * Si lo que encuentra la api no coincide con originales
		 * por cada originales que falten en la respuesta hace su insert a api
		 */
		const diferencia = filtrarNuevasTraduccionesNoExistentes(this.messages.value, this.nuevasT.value);
		if (diferencia.length !== 0) {
			this.setApiTraducciones(diferencia);
			this.messages.value.push(...diferencia);
		}

		return this.messages.value;

	}

	public appendTraducciones(trad: TraduccionItem[][]) {
		// Flatten the array of arrays and filter unique translations in a single pass
		// const flattenedTrad = trad.flat();
		// for (const t of flattenedTrad) {
		// 	if (t && t.idioma && t.page && t.label && !this.existeTraduccion(t.idioma, t.page, t.label)) {
		// 		this.messages.value.push(t);
		// 	}
		// }
		// Ensure we clear the loading state
		// this.cargandoTraducciones.value = false;
		for (const traducciones of trad) {
			for (const t of traducciones) {
				t.idioma = t.idioma || this.idioma.value; // Aseguramos que cada item tenga el idioma
				if (t.page && t.label && !this.existeTraduccion(t.idioma, t.page, t.label)) {
					this.messages.value.push(t);
					this.deLaApi.value.push(t); // Guardamos también en deLaApi
				}
			}
		}
	}


	private setApiTraducciones(trad: NuevasTraducciones) {

		for (const nueva of trad) {
			this.api.insertTraduccion(nueva.idioma ? nueva.idioma : '', nueva.page, nueva.label, nueva.traduccion)
		}
		// const promises: Promise<unknown>[] = []
		// for (const page of Object.keys(trad)) {
		// 	const pageObj = trad[page as keyof NuevasTraducciones];

		// 	// Si existe un objeto de etiquetas para esa página…
		// 	if (pageObj && typeof pageObj === "object") {
		// 		// Recorremos cada "label" dentro de esa página
		// 		for (const label of Object.keys(pageObj as AnyObject)) {
		// 			const value = (pageObj as AnyObject)[label] as string;

		// 			// Aquí llamamos a tu método (ahora solo hace console.log, 
		// 			// luego insertará en la base de datos)
		// 			const promesa = this.setApiTraduccion(page, label, value);
		// 			this.setTraduccion(page, label, value)
		// 			promises.push(promesa)
		// 		}
		// 	}
		// }
		// await Promise.all(promises)
	}

	// private async setApiTraduccion(page: string, label: string, value: string) {
	// 	/**
	// 	 * hace insert en la API
	// 	 */
	// 	console.log('En construcción...')
	// 	console.log(`Haciendo insert de: Página = ${page}, Label = ${label}, Value = ${value}`)

	// 	this.api.insertTraduccion(this.idioma.value, page, label, value)

	// }

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
