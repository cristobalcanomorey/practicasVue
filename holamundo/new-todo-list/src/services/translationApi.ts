import type { Idioma, Traducciones , TraduccionItem} from "@/types";
import { ref, type Ref } from 'vue';

export class ApiTraductor {
	static traducciones: object;
	static dummyTraducciones : Ref<TraduccionItem[][]>;
	constructor() {
		// this.idioma = idioma as Idioma;
		ApiTraductor.dummyTraducciones = ref([
			[
				{
					page: 'Inventada',
					label: 'de-api',
					traduccion: 'Traducción obtenida de la API',
				},
				{
					page: 'Inventada2',
					label: 'NavBar',
					traduccion: 'Traducción obtenida de la API',
				},
				
				{page: 'NavBar', label: 'inicio', traduccion: ' Inicio '}

			],
			[
				{
					page: 'Inventada',
					label: 'de-api',
					traduccion: 'Translation obtained from the API',
				},
				{
					page: 'Inventada2',
					label: 'NavBar',
					traduccion: 'Translation obtained from the API',
				},
				{
					page: 'NavBar',
					label: 'inicio2',
					traduccion: 'Translation obtained from the API',
				},
				
				{page: 'NavBar', label: 'inicio', traduccion: ' Home '}


			]

		])
	}

	// static async fetchTraduccionesAsync() {
	// 	ApiTraductor.traducciones = await this.getTraduccionesAsync();
	// }

	// static async getTraduccionesAsync(): Promise<object> {
	// 	return new Promise((resolve) => {
	// 		setTimeout(() => {
	// 			resolve(ApiTraductor.getTraducciones());
	// 		}, 1000);
	// 	});
	// }

	public async getTraduccionesPaginaAsync(idioma: Idioma,page: string): Promise<TraduccionItem[]> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(ApiTraductor.getTraduccionesPagina(idioma, page));
			}, 5000);
		});
	}

	/**
SELECT 
seo_paginas.page, traducciones.label ,traducciones.traduccion
FROM `traducciones` 
#INNER JOIN traducciones_ca ON traducciones_ca.id = traducciones.id
#INNER JOIN traducciones_en ON traducciones_en.id = traducciones.id
INNER JOIN seo_paginas ON seo_paginas.id = traducciones.seo_pagina_id
	 * @param idioma 
	 * @param page 
	 * @returns 
	 */
	static getTraduccionesPagina(idioma: Idioma, page: string): TraduccionItem[] {
		// Llamada a Api, suponemos que pag es nav
		console.log(`Select todo from traducciones where page = '${page}'`);
		
		
		if( idioma === 'es'){
			return ApiTraductor.dummyTraducciones.value[0];
		} else if (idioma === 'en') {
			return ApiTraductor.dummyTraducciones.value[1];
		} else {
			console.warn(`Idioma no soportado: ${idioma}. Usando español por defecto.`);
			return ApiTraductor.dummyTraducciones.value[0].filter(item => item.page === page);
		}
	}

	/**
	 * Todas las traducciones de todas las páginas, no funcionará así
	 * @returns 
	 */
	// public static getTraducciones(): object {

	// 	// Llamada a Api
	// 	return {
	// 		es: {
	// 			nav: {
	// 				web: "Página web",
	// 				esUnaWeb: "Esto es una página web",
	// 				es: "es",
	// 				en: "en",
	// 				acerca: "Acerca de",
	// 				nueva: "Nueva",
	// 				inicio: "<span>Inicio</span>",
	// 			},
	// 			home: {
	// 				todoInpLabel: "Nueva tarea",
	// 				prioritario: "Prioritario",
	// 				crear: "Crear",
	// 				todas: "Todas",
	// 				pendientes: "Pendientes",
	// 				completadas: "Completadas",
	// 				prioritarias: "Prioritarias",
	// 				creaNuevaTarea: "Crea una nueva tarea",
	// 				quedanNPendientes: "Quedan <0>{n}</0> pendientes",
	// 				todasCompletadas: "Todas las tareas están completadas",
	// 			}
	// 		},
	// 		en: {
	// 			nav: {
	// 				web: "Website",
	// 				esUnaWeb: "This is a website",
	// 				es: "es",
	// 				en: "en",
	// 				acerca: "About",
	// 				nueva: "New",
	// 				inicio: "Home",
	// 			},
	// 			home: {
	// 				todoInpLabel: "New task",
	// 				prioritario: "Priority",
	// 				crear: "Create",
	// 				todas: "All",
	// 				quedanNPendientes: "<0>{n}</0> tasks remaining",
	// 				completadas: "Completed",
	// 				prioritarias: "Priority",
	// 				creaNuevaTarea: "Create a new task",
	// 				quedan: "Remaining",
	// 				todasCompletadas: "All tasks are completed",
	// 			}
	// 		}
	// 	} as object;
	// }

	// public traducir(page: string, label: string, defecto: null | string = null): string {
	// 	const paginaObj = (ApiTraductor.traducciones as any)[this.idioma]?.[page] as Record<string, string> | undefined;

	// 	if (!paginaObj || !(label in paginaObj)) {
	// 		console.log(`Guardando traducción por defecto para '${label}' en '${this.idioma}.${page}'`);
	// 		// Llamada al API para insertar la traducción por defecto
	// 		ApiTraductor.insertTraduccion(page, label, defecto ?? '');
	// 		return defecto ?? '';
	// 	}

	// 	return paginaObj[label];
	// }

	public insertTraduccion(idioma: string, page: string, label: string, traduccion: string) {
		// Llamada a Api
		// console.log(`${idioma}: Insertando traducción: ${label} -> ${traduccion} en ${page}`);
		if(idioma === 'es') {
			ApiTraductor.dummyTraducciones.value[0].push({ page, label, traduccion });
		} else if(idioma === 'en') {
			ApiTraductor.dummyTraducciones.value[1].push({ page, label, traduccion });
		}
		// console.log('Traducciones actuales en API desde ', page, ':', ApiTraductor.dummyTraducciones.value);
	}

	// traducirConHtml(page: string, label: string, defecto: null | string = null): string {
	// 	const translation = this.traducir(page, label, defecto);
	// 	return translation.replace(/<(\w+)>/g, "<$1 class='translated'>");
	// }
}
