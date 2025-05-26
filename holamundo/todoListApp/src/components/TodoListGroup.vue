<script setup lang="ts">
import TodoList from './TodoList.vue'
import TodoForm from './TodoForm.vue'
import { ref } from 'vue'
import type { Todo } from '@/types/todo'
import type { TodoListType } from '@/types/todo'

// Obtiene del padre la nueva lista a crear y hideCompleted
const props = defineProps<{
  hideCompleted: boolean
  newList: string | null
}>()

const listas = ref<TodoListType[]>([])

// Añade una nueva tarea a la lista
function handleAdd(todo: Todo, lista: TodoListType) {
  lista.todos.push(todo)
}

const emit = defineEmits(['checkListOcultos', 'clearNew'])

// Elimina una lista por su nombre
function handleRemove(listName: string) {
  listas.value = listas.value.filter((lista) => {
    return lista.name != listName
  })
  console.log(listName, listas.value)
}

// Expone las listas al padre
defineExpose({
  listas,
})
</script>
<template>
  <div>
    <TransitionGroup name="slide-fade">
    <div v-for="(lista, index) in listas" :key="index">
        <TodoForm
          :key="index"
          v-model="listas[index]"
          @add="(todo) => handleAdd(todo, lista)"
          @removeList="(listName) => handleRemove(listName)"
        />
     
        <TodoList
          :name="lista.name"
          v-model:lista="listas[index]"
          :key="index"
          :hideCompleted="hideCompleted"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

ul {
  list-style-type: disc !important;
  padding-left: 2rem !important;
  margin: 1rem 0;
}
</style>
