import type { Ref } from "vue"

export type Todo = {
  id: number
  text: string
  done: boolean,
  oculto: boolean
}

export type ListState = {
  hayCompletados: boolean,
  hayOcultos: boolean
}

export type TodoListType = {
  name: string,
  todos: Todo[],
  listState: ListState
}