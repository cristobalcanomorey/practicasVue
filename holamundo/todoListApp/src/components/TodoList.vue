<script setup lang="ts">
import { reactive } from 'vue'
import type { Todo } from '@/types'
import RemoveTask from '@/components/RemoveTask.vue'
import TodoItem from '@/components/TodoItem.vue'
const props = defineProps<{
    todos: Todo[]
  }>()
  
</script>
<template>
  <ul>
    <TodoItem v-for="todo in props.todos" :todo="todo" />
  </ul>
</template>