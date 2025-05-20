import type { Ref } from "vue"

export type Todo = {
  id: number
  text: string
  done: boolean,
  oculto: boolean
}

export type Options = {
  toggleOcultarDones: Ref<boolean>,
  hayCompletados: Ref<boolean>,
  hayOcultos: Ref<boolean>
}