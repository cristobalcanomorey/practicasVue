<script setup lang="ts">
import { useTodos } from '@/composables/useTodos';
import TodoItem from '@/components/TodoItem.vue';
import TodoForm from './TodoForm.vue';
const {
    todos,
    toggleTodo,
    removeTodo
} = useTodos()

  
</script>
<template>
  <TodoForm />
  <ul>
    <TodoItem  
      v-for="todo in todos" 
      :key="todo.id"
      :todo="todo"
      :toggle="toggleTodo"
      :remove="removeTodo"
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