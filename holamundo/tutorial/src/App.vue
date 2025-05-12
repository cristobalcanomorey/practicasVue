<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
const header = ref('Shopping List App')
type Item = {
  id: number,
  label: string
}
const items = ref<Item[]>([
  {
    id: 0,
    label: "10 party hats"
  },
  {
    id: 1,
    label: "2 board games"
  },
  {
    id: 2,
    label: "20 cups"
  },
  {
    id: 3,
    label: "Test"
  }

])
const newItem = ref('')
function addItem(item: string){
  items.value.push(
    {
      id: items.value.length,
      label: item
    }
  )
  newItem.value = ''
}
function delItem(id: number){
  items.value = items.value.filter(item => item.id !== id )
}
</script>

<template>
  <h1>{{ header }}</h1>
  <form @submit.prevent="addItem(newItem)" class="add-item-form">
    <input required v-model="newItem" type="text" placeholder="Add an item">
    <button class="btn btn-primary">
      Save item
    </button>
  </form>
  
  {{newItem}}
  <ul>
    <li 
      v-for="{id, label} in items"
      :key="id"
    >{{label}} <span @click="delItem(id)" style="margin-left: 15px;color:red">[eliminar]</span></li>
  </ul>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
