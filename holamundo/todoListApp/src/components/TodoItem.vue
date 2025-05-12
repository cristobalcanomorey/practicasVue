<script setup lang="ts">
import { reactive } from 'vue'
import type { Todo } from '@/types'
import RemoveTask from '@/components/RemoveTask.vue'

const props = defineProps<{
    todo: Todo,
    removeTodo: (t: Todo) => void
  }>()
const todo = reactive<Todo>(props.todo) // Assuming you want to work with the first todo item
</script>
<template>
    <li :key="todo.id" :class="{ completed: todo.completed }" @click="todo.completed = !todo.completed">
      <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
      <RemoveTask :remove-todo="(t: Todo) => props.todos.filter(todo => todo.id !== t.id)" :todos="props.todos" :deleteTodo="todo" />
    </li>
</template>