<script setup lang="ts">
import { useTodos } from '@/composables/useTodos';
import TodoItem from '@/components/TodoItem.vue';
import TodoForm from './TodoForm.vue';
// const {
//     todos,
//     toggleTodo,
//     removeTodo
// } = useTodos()
const props = defineProps<{
  name: string
}>()
const model = defineModel<any>()

const isTodos = useTodos(model.value)

console.log(isTodos.test())
</script>
<template>
  {{  name }}
  <TodoForm v-model="model" />
  <ul>
    <TodoItem
      v-for="todo in model"
      :key="todo.id"
      :todo="todo"
      :toggle="isTodos.toggleTodo"
      :remove="isTodos.removeTodo"
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