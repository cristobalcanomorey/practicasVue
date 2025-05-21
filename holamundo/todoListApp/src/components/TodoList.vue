<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue';
import TodoForm from './TodoForm.vue';
import type { Todo } from '@/types/todo';
import { computed } from 'vue';
import type { Options } from '@/types/todo';

const props = defineProps<{
  name: string,
  toggleOcultarDones: boolean,
  hayCompletados: boolean,
  hayOcultos: boolean
}>();

const lista = defineModel<Todo[]>('lista', {
  default: () => ([])
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
const emit = defineEmits(['toggleDone'])
function handleRemove( id: number) {
  lista.value = lista.value.filter((todo: Todo) => todo.id !== id);
}

function handleDone(){
  emit('toggleDone');
}

</script>
<template>
  {{  name }}
  
  <ul v-if="lista.length > 0">
    <TodoItem
      v-for="todo in lista"
      :key="todo.id"
      :todo="todo"
      :hayCompletados="hayCompletados" :hayOcultos="hayOcultos" :toggleOcultarDones="toggleOcultarDones"
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