<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue';
import TodoForm from './TodoForm.vue';
import type { Todo } from '@/types/todo';
// import { ref } from 'vue';
import type { Options } from '@/types/todo';

const props = defineProps<{
  name: string
}>();

const lista = defineModel<Todo[]>('lista', {
  default: () => ([])
});

const options = defineModel<Options>('options', {
  default: () => ({
    toggleOcultarDones: false,
    hayCompletados: false,
    hayOcultos: false
  })
});


function handleRemove( id: number) {
  lista.value = lista.value.filter((todo: Todo) => todo.id !== id);
}

</script>
<template>
  {{  name }}
  
  <ul v-if="lista.length > 0">
    <TodoItem
      v-for="todo in lista"
      :key="todo.id"
      :todo="todo"
      v-model:options="options"
      @remove="handleRemove(todo.id)"
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