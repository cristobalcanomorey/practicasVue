<script setup lang="ts">
// import { useTodos } from '@/composables/useTodos';
// import TodoItem from '@/components/TodoItem.vue';
// import TodoForm from './TodoForm.vue';
import TodoList from './TodoList.vue';
import { ref } from 'vue';

const listas = ref({ 
  'Grupo 1': [
   
  ],
  'Grupo 2': [

  ],
});

</script>
<template>
<TodoList name="Group 1" v-model="listas['Grupo 1']" />
<TodoList name="Group 2" v-model="listas['Grupo 2']" />
  <!-- <TodoForm />
  <ul>
    <TodoItem  
      v-for="todo in todos" 
      :key="todo.id"
      :todo="todo"
      :toggle="toggleTodo"
      :remove="removeTodo"
      />
  </ul> -->
</template>

<style scoped>
ul {
  list-style-type: disc !important;
  padding-left: 2rem !important;
  margin: 1rem 0;
}
</style>