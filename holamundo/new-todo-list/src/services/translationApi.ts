import type { Idioma, Traducciones } from "@/types";

export class ApiTraductor {
	static traducciones: object;
	constructor(private idioma: Idioma) {
		// this.idioma = idioma as Idioma;
	}

	static async fetchTraduccionesAsync() {
		ApiTraductor.traducciones = await this.getTraduccionesAsync();
	}

	static async getTraduccionesAsync(): Promise<object> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(ApiTraductor.getTraducciones());
			}, 1000);
		});
	}

	public async getTraduccionesPaginaAsync(idioma: Idioma, page: string): Promise<Traducciones> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(ApiTraductor.getTraduccionesPagina(idioma, page));
			}, 1000);
		});
	}

	static getTraduccionesPagina(idioma: Idioma, page: string): Traducciones {
		// Llamada a Api, suponemos que pag es nav
		return {
			es: {
				[page]: {
					web: "Página web",
					esUnaWeb: "Esto es una página web",
					es: "es",
					en: "en",
					acerca: "Acerca de",
					nueva: "Nueva",
					inicio: "<span>Inicio</span>",
				}
			},
			en:{
				[page]:{

				}
			}
		} 
	}

	public static getTraducciones(): object {

		// Llamada a Api
		return {
			es: {
				nav: {
					web: "Página web",
					esUnaWeb: "Esto es una página web",
					es: "es",
					en: "en",
					acerca: "Acerca de",
					nueva: "Nueva",
					inicio: "<span>Inicio</span>",
				},
				home: {
					todoInpLabel: "Nueva tarea",
					prioritario: "Prioritario",
					crear: "Crear",
					todas: "Todas",
					pendientes: "Pendientes",
					completadas: "Completadas",
					prioritarias: "Prioritarias",
					creaNuevaTarea: "Crea una nueva tarea",
					quedanNPendientes: "Quedan <0>{n}</0> pendientes",
					todasCompletadas: "Todas las tareas están completadas",
				}
			},
			en: {
				nav: {
					web: "Website",
					esUnaWeb: "This is a website",
					es: "es",
					en: "en",
					acerca: "About",
					nueva: "New",
					inicio: "Home",
				},
				home: {
					todoInpLabel: "New task",
					prioritario: "Priority",
					crear: "Create",
					todas: "All",
					quedanNPendientes: "<0>{n}</0> tasks remaining",
					completadas: "Completed",
					prioritarias: "Priority",
					creaNuevaTarea: "Create a new task",
					quedan: "Remaining",
					todasCompletadas: "All tasks are completed",
				}
			}
		} as object;
	}

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

	public insertTraduccion(idioma:string, page: string, label: string, traduccion: string) {
		// Llamada a Api
		console.log(`${idioma}: Insertando traducción: ${label} -> ${traduccion} en ${page}`);
	}

	// traducirConHtml(page: string, label: string, defecto: null | string = null): string {
	// 	const translation = this.traducir(page, label, defecto);
	// 	return translation.replace(/<(\w+)>/g, "<$1 class='translated'>");
	// }
}
