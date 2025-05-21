<script setup lang="ts">
import TodoList from './TodoList.vue';
import TodoForm from './TodoForm.vue';
import { ref, watch, toRef  } from 'vue';
import type { Todo } from '@/types/todo';
import type { ListState, TodoListType } from '@/types/todo';

// const models = defineModel<Options>('models');
const props = defineProps({
  toggleOcultarDones: Boolean,
  gl: Boolean
})
// const lista1 = ref<Todo[]>([
// ]);
const lista1 = ref<TodoListType>({
  name: 'Lista 1',
  todos: [],
  listState: {
    hayCompletados: false,
    hayOcultos: false
  }
})

const lista2 = ref<TodoListType>({
  name: 'Lista 2',
  todos: [],
  listState: {
    hayCompletados: false,
    hayOcultos: false
  }
})

const listas = ref<TodoListType[]>([lista1.value, lista2.value]);

function handleAdd(todo: Todo, lista: TodoListType) {
  lista.todos.push(todo);
}
const emit = defineEmits(['checkListState', 'checkListOcultos'])

watch(toRef(props.gl), (newValue) => {
  if (newValue) {
    emit('checkListState', listas.value);
  }
})

function checkCompletados(listas: TodoListType[]){
  emit('checkListState', listas);

}
</script>
<template>
  <div>
    <TodoForm v-model="lista1" @add="todo => handleAdd(todo, lista1)" />
    <TodoList
      name="Lista 1"
      v-model:lista="lista1"
      :toggleOcultarDones="toggleOcultarDones"
      @checkCompletados="checkCompletados(listas)"
       />
  
  
    <TodoForm v-model="lista2" @add="todo => handleAdd(todo, lista2)" />
    <TodoList
      name="Lista 2"
      v-model:lista="lista2"
      :toggleOcultarDones="toggleOcultarDones"
      @checkCompletados="checkCompletados(listas)"
    />

  </div>
  
</template>

<style scoped>
ul {
  list-style-type: disc !important;
  padding-left: 2rem !important;
  margin: 1rem 0;
}
</style>