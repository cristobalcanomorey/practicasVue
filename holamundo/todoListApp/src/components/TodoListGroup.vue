<script setup lang="ts">
import TodoList from './TodoList.vue';
import TodoForm from './TodoForm.vue';
import { ref } from 'vue';
import type { Todo } from '@/types/todo';
import type { Options } from '@/types/todo';

// const models = defineModel<Options>('models');
const props = defineProps<Options>()
const lista1 = ref<Todo[]>([
]);
const lista2 = ref<Todo[]>([
]);

function handleAdd(todo: Todo, lista: Todo[]) {
  lista.push(todo);
}
const emit = defineEmits(['toggleDone'])
function handleDone(){
  emit('toggleDone')
}
</script>
<template>
  <div>
    <TodoForm v-model="lista1" @add="todo => handleAdd(todo, lista1)" />
    <TodoList
      name="Lista 1"
      v-model:lista="lista1"
      :hayCompletados="hayCompletados"
      :hayOcultos="hayOcultos"
      :toggleOcultarDones="toggleOcultarDones"
      @toggleDone="handleDone()"
       />
  
  
    <TodoForm v-model="lista2" @add="todo => handleAdd(todo, lista2)" />
    <TodoList
    name="Lista 2"
    v-model:lista="lista2"
    :hayCompletados="hayCompletados"
    :hayOcultos="hayOcultos"
    :toggleOcultarDones="toggleOcultarDones"
    @toggleDone="handleDone()"
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