import { IDIOMAS, FILTROSTAREAS } from "@/constantes/constantes";

export interface Task {
	id: number;
	title: string;
	done: boolean;
	priority: boolean;
}

export type TaskFilter = typeof FILTROSTAREAS[number];
export type Idioma = typeof IDIOMAS[number];

export type AnyObject = { [key: string]: any };

/**
 * ej: 
 * {
 *	es: {
 *		nav: {
 *			web: "Página web"
 *		}
 * 	}
 * }
 */
export type Traducciones =
	Record<
		Idioma, Record<
			string, Record<
				string, string
			>
		>
	>;
	
// export type Traducciones = {
// 	[idioma in Idioma]: {
// 		[seccion: string]: TraduccionEntry;
// 	}
// }
// export type TraduccionEntry = {
//   key: string;
//   value: string;
// };