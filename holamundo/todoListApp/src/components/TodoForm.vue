<script setup lang="ts">
import {ref} from 'vue'
import type { Todo } from '@/types/todo'
import type { TodoListType } from '@/types/todo'

const newTask = ref<string>('');

const model = defineModel<TodoListType>();
const emit = defineEmits(['add', 'removeList']);

// Crea una nueva tarea
function add() {
  if (newTask.value && model.value != undefined) {
    model.value.todos.push({
      id: Date.now(),
      text: newTask.value,
      done: false,
      oculto: false
    } as Todo);
    newTask.value = '';
  }
}

// Emite el nombre de la tarea a eliminar
function removeList(){
  if(model.value ){
    emit('removeList', model.value.name)
  }
}

</script>
<template>
  <button class="btn btn-cancel" @click.stop="removeList()">Eliminar lista</button>
  <form id="todo-form" class="add-item-form" @submit.prevent="add()">
    <input
      type="text"
      v-model="newTask"
      placeholder="Añade una tarea nueva"
      required
    />
    <button class="btn btn-primary" type="submit">Añadir tarea</button>
  </form>
</template>

<style scoped>
#todo-form > input,
#todo-form > select {
  width: 100%;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f8;
  color: #606f7b;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  font-size: 1rem;
  letter-spacing: 0.5px;
  margin: 0.5rem 0;
}
.add-item-form{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.add-item-form input {
  width: 70%;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f8;
  color: #606f7b;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  font-size: 1rem;
  letter-spacing: 0.5px;
  margin: 0.5rem 0;
}
.btn {
  border: none;
  border-radius: 3px;
  margin: auto 0;
  padding: 0.5rem 0.75rem;
  flex-shrink: 0;
  cursor: pointer;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  transition: all 0.1s ease-in;
}

.btn[disabled] {
  background: #8795a1;
}

.btn[disabled]:hover {
  background: #606f7b;
}

.btn-primary {
  background: #6cb2eb;
  color: #fff;
  margin-left: 15px;
}

.btn-primary:hover {
  background: #3490dc;
}
</style>