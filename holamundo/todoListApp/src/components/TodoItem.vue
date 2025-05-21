<script setup lang="ts">
import type { Todo } from '@/types/todo';
// import type { Options } from '@/types/todo';
import { computed, watch } from 'vue';

// const {todo} = defineProps<{
//   todo: Todo
// }>();

const props = defineProps<{
  todo: Todo,
  toggleOcultarDones: boolean,
  hayCompletados: boolean,
  hayOcultos: boolean
}>();

const emit = defineEmits(['remove', 'toggleDone']);

function toggleDone(){
  console.log('done');
  props.todo.done = !props.todo.done;
  emit('toggleDone');
}
function remove(id: number){
  emit('remove', id);
}
// const options = defineModel<Options>('options', {
//   default: () => ({
//     toggleOcultarDones: false,
//     hayCompletados: false,
//     hayOcultos: false
//   })
// });

// todo.oculto = todo.done && toggleOcultarDones.value;

// const oculto = computed(() => {
//   console.log('computed', props.todo.done, options.value.toggleOcultarDones);
//   return options.value.toggleOcultarDones && props.todo.done;
// });

// watch(oculto, (newValue) => {
//   todo.oculto = newValue;
// });



</script>
<template>
    <li
      v-if="!todo.oculto"
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