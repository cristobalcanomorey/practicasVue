<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Todo } from '@/types'
const newTodo = ref('')
const props = defineProps<{
  todos: Todo[]
}>()
const addTodo = () => {
  if (newTodo.value.trim()) {
    props.todos.push({
      id: props.todos.length + 1,
      text: newTodo.value.trim(),
      completed: false
    })
    newTodo.value = ''
  }
}
</script>
<template>
  <form @submit.prevent="addTodo">
    <input
      type="text"
      v-model="newTodo"
      placeholder="Add a new task"
      required
    />
    <button type="submit">Add</button>
  </form>
</template>