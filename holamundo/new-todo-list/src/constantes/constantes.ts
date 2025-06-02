import type { Idioma } from "@/types"
import {getPaginas} from "@/services/generalApi"

export const API_URL = 'http://127.0.0.1:8000'
export const IDIOMAS = ["es", "en"] as const
export const FILTROSTAREAS = ["all", "todo", "completed", "priority"] as const
