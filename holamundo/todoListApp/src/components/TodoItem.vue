<script setup lang="ts">
import RemoveTask from '@/components/RemoveTask.vue'
import type { Todo } from '@/types/todo';

const props = defineProps<{
  todo: Todo,
  toggle: (id: number) => void,
  remove: (id: number) => void
}>()


</script>
<template>
    <li
      v-if="!todo.oculto"
      :key="props.todo.id"
      :class="{ strikeout: props.todo.done }"
      class="todo-item"
      @click="props.toggle(props.todo.id)"
      >
      <span :class="{ strikeout: props.todo.done }">{{ props.todo.text }}</span>
      <RemoveTask :remove="remove" :id="todo.id"/>
    </li>
</template>

<style scoped>
.todo-item{
  margin-bottom: 0px;
  display: list-item !important;
  list-style: inherit !important;
}
.todo-item > span{
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