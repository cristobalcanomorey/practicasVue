<script setup lang="ts">
import {ref} from 'vue'

const newTask = ref('')


const model = defineModel<any>()


const add = () =>{
newTask.value.trim()
  model.value.push({ 
    id: Date.now(),
    text: newTask.value,
    done: false,
    oculto: false
  })
  newTask.value = ''
}
</script>
<template>
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