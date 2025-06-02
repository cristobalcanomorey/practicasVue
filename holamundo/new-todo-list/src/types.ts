import { IDIOMAS, FILTROSTAREAS } from "./constantes/constantes";

export interface Task {
	id: number;
	title: string;
	done: boolean;
	priority: boolean;
}

export type TaskFilter = typeof FILTROSTAREAS[number];
export type Idioma = typeof IDIOMAS[number];
// export type Traducciones = {
// 	[idioma in Idioma]: {
// 		[seccion: string]: TraduccionEntry;
// 	}
// }
// export type TraduccionEntry = {
//   key: string;
//   value: string;
// };