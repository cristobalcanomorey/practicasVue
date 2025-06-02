// src/composables/useLoadLocale.ts
import { Traductor } from '@/services/translationApi'


export class TraductorManager {
	static prom: object = {};
	static async getPromesa(idioma: string, page: string): Promise<Record<string, object>> {
		const promes = (this.prom as Record<string, object>)[page] as Record<string, object> | undefined;
		// console.log("getPromesa", page, promes);
		if (promes) {
			return promes;
		}
		const paginaTrad = await Traductor.getTraduccionesPaginaAsync(idioma, page) as Promise<Record<string, string>>;
		this.setPromesaPagina(page, paginaTrad);
		const result: Record<string, object> = {};
		result[page] = paginaTrad;
		return result;
	}

	static async setPromesaPagina(page: string, traducciones: Promise<Record<string, string>> | Record<string, string>) {
		if (traducciones instanceof Promise) {
			traducciones = await traducciones;
		}
		Object.keys(traducciones).forEach((key) => {
			const value = traducciones[key] as string;
			if (typeof value === 'string' && value !== null) {
				TraductorManager.setPromesa(page, key, value);
			}
		});
	}

	static setPromesa(page: string, label: string, value: string) {
		const p = (this.prom as Record<string, object>)[page] as Record<string, string> | undefined;
		if (!p) {
			const l = { key: label, value: value } as Record<string, string> | undefined;
			// Llamada a Api para guardar la traducción
			console.log("setPromesa", page);
			Traductor.insertTraduccion(page, label, value);
		}
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
