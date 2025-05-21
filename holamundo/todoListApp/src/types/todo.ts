import type { Ref } from "vue"

export type Todo = {
  id: number
  text: string
  done: boolean,
  oculto: boolean
}

export type Options = {
  toggleOcultarDones: boolean,
  hayCompletados: boolean,
  hayOcultos: boolean
}