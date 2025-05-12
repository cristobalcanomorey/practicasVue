<script setup lang="ts">
import {reactive} from 'vue'
import type { Todo } from '@/types'
const props = defineProps<{
    todos: Todo[],
    removeTodo: 
}>()
const deleteTodo = reactive<Todo>(props.removeTodo)
const removeTodo = (t: Todo) => props.todos.filter(todo => todo.id !== t.id)

</script>
<template>
  <button @click="removeTodo(deleteTodo)">Remove</button>
</template>