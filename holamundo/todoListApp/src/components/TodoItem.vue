<script setup lang="ts">
import type { Todo } from '@/types/todo'
import gsap from 'gsap'
// Obtiene el Todo y el hideCompleted del padre
const props = defineProps<{
  todo: Todo
  hideCompleted: boolean
}>()

const emit = defineEmits(['remove'])

// Marca o desmarca una tarea como completada e informa al padre sobre el cambio
function toggleDone() {
  props.todo.done = !props.todo.done
}

// Indica al padre el id de la tarea a eliminar
function remove(id: number) {
  emit('remove', id)
}

</script>
<template>
    <li
      :key="todo.id"
      :class="{ strikeout: todo.done }"
      class="todo-item"
      @click="toggleDone()"
    >
      <span :class="{ strikeout: todo.done }">{{ todo.text }}</span>
      <button class="btn btn-cancel" @click.stop="remove(todo.id)">Eliminar</button>
    </li>
</template>

<style scoped>
.todo-item {
  margin-bottom: 0px;
  display: list-item !important;
  list-style: inherit !important;
}
.todo-item > span {
  margin-right: 15px;
  padding: 0.3rem 0.55rem;
  display: inline-block;
}
.strikeout {
  text-decoration: line-through;
  color: #b8c2cc;
}

.strikeout:hover {
  color: #8795a1;
}
</style>
