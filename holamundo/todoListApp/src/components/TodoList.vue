<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue';
import TodoForm from './TodoForm.vue';
import type { Todo } from '@/types/todo';
import { computed, watch } from 'vue';
import type { ListState, TodoListType } from '@/types/todo';
import {  ref } from 'vue';

const props = defineProps<{
  name: string,
  toggleOcultarDones: boolean,
  // hayCompletados: boolean,
  // hayOcultos: boolean
}>();

const lista = defineModel<TodoListType>('lista', {
  default: () => (
    {
      name: '',
      todos: [],
      listState: {
        hayCompletados: false,
        hayOcultos: false
    }
  })
});

// const options = defineModel<Options>('options', {
//   default: () => ({
//     toggleOcultarDones: false,
//     hayCompletados: false,
//     hayOcultos: false
//   })
// });

// const hayCompletados = computed(() => {
//   console.log('hayCompletados', lista.value.length, lista.value.some((todo: Todo) => todo.done));
//   return lista.value.length > 0 && lista.value.some((todo: Todo) => todo.done);
// });

// options.value.hayCompletados = hayCompletados;
// const emit = defineEmits(['toggleDone'])


watch(() => props.toggleOcultarDones, (newValue) => {
  lista.value.todos.forEach((todo: Todo) => todo.oculto = newValue? todo.done : false);  
  lista.value.listState.hayOcultos = lista.value.todos.some((todo: Todo) => todo.oculto);
})


const emit = defineEmits(['checkCompletados'])


function handleRemove( id: number) {
  lista.value.todos = lista.value.todos.filter((todo: Todo) => todo.id !== id);
}

function handleDone(){
  // emit('toggleDone');
  lista.value.listState.hayCompletados = lista.value.todos.length > 0 && lista.value.todos.some((todo: Todo) => todo.done);
  emit('checkCompletados', lista);
}

</script>
<template>
  {{  name }}
  
  <ul v-if="lista.todos.length > 0">
    <TodoItem
      v-for="todo in lista.todos"
      :key="todo.id"
      :todo="todo"
      :hayCompletados="lista.listState.hayCompletados" :hayOcultos="lista.listState.hayOcultos" :toggleOcultarDones="toggleOcultarDones"
      @remove="handleRemove(todo.id)"
      @toggleDone="handleDone()"
      />
  </ul>
</template>

<style scoped>
ul {
  list-style-type: disc !important;
  padding-left: 2rem !important;
  margin: 1rem 0;
}
</style>