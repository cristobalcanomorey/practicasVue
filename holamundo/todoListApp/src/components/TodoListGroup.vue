<script setup lang="ts">
import TodoList from './TodoList.vue';
import TodoForm from './TodoForm.vue';
import { ref } from 'vue';
import type { Todo } from '@/types/todo';
import type { Options } from '@/types/todo';

const models = defineModel<Options>('models');
const lista1 = ref<Todo[]>([
  { id: 1, text: 'Tarea 1', done: false, oculto: false },
  { id: 2, text: 'Tarea 2', done: false, oculto: false },
  { id: 3, text: 'Tarea 3', done: false, oculto: false },
  { id: 4, text: 'Tarea 4', done: false, oculto: false },
  { id: 5, text: 'Tarea 5', done: false, oculto: false }
]);
const lista2 = ref<Todo[]>([
  { id: 1, text: 'Todo 1', done: false, oculto: false },
  { id: 2, text: 'Todo 2', done: false, oculto: false },
  { id: 3, text: 'Todo 3', done: false, oculto: false },
  { id: 4, text: 'Todo 4', done: false, oculto: false },
  { id: 5, text: 'Todo 5', done: false, oculto: false }
]);

function handleAdd(todo: Todo, lista: Todo[]) {
  lista.push(todo);
}
</script>
<template>
  
    <TodoForm v-model="lista1" @add="todo => handleAdd(todo, lista1)" />
    <TodoList name="Group 1" v-model:lista="lista1" v-model:options="models" />
  
  
    <TodoForm v-model="lista2" @add="todo => handleAdd(todo, lista2)" />
    <TodoList name="Group 2" v-model:lista="lista2" v-model:options="models" />
  
</template>

<style scoped>
ul {
  list-style-type: disc !important;
  padding-left: 2rem !important;
  margin: 1rem 0;
}
</style>