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

export type TraduccionItem = {
	idioma?: Idioma;
	page: string;
	label: string;
	traduccion: string;
};

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
export type Traducciones = {
	[lang in Idioma]?: {
		[key: string]: {
			[key: string]: string;
		};
	};
};

// export type NuevaTraduccion = {
// 	idioma: Idioma;
// 	page: string;
// 	label: string;
// 	traduccion: string;
// }

export type NuevasTraducciones = Array<TraduccionItem>;

// export type Traducciones = {
// 	[idioma in Idioma]: {
// 		[seccion: string]: TraduccionEntry;
// 	}
// }
// export type TraduccionEntry = {
//   key: string;
//   value: string;
// };