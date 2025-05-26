<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue'
import type { Todo } from '@/types/todo'
import { computed } from 'vue'
import type { TodoListType } from '@/types/todo'

// Obtiene el name y el hideCompleted del padre
const props = defineProps<{
  name: string
  hideCompleted: boolean
}>()

// Macro para compartir la lista de tareas con el padre
const lista = defineModel<TodoListType>('lista', {
  default: () => ({
    name: '',
    todos: [],
  }),
})

// Crea una nueva lista de tareas visibles, si se están ocultando las completadas obtiene sólo las no completadas
const visibleList = computed(() => {
  return lista.value.todos.filter((todo: Todo) => {
    if (props.hideCompleted) {
      return !todo.done
    }
    return true
  })
})

// Elimina una tarea
function handleRemove(id: number) {
  lista.value.todos = lista.value.todos.filter((todo: Todo) => todo.id !== id)
}

</script>
<template>
  {{ name }}

  <TransitionGroup  name="bounce" tag="ul" >
    <TodoItem
      v-for="todo in visibleList"
      :key="todo.id"
      :todo="todo"
      :hideCompleted="hideCompleted"
      @remove="handleRemove(todo.id)"
    />
  </TransitionGroup >
</template>

<style >
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
ul {
  list-style-type: disc !important;
  padding-left: 2rem !important;
  margin: 1rem 0;
}
</style>
