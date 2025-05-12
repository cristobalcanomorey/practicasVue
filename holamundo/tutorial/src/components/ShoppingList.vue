<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { ref, computed, watch } from 'vue'
type Item = {
  id: number,
  label: string,
  purchased?: boolean,
  highPriority?: boolean
}
const props = withDefaults(
  defineProps<{
    editing?: boolean,
  }>(),
  {
      editing: false
  }
)
const newItemHighPriority = ref(false)
const editing = ref(props.editing)
const items = ref<Item[]>([
  {
    id: 0,
    label: "10 party hats",
    purchased: false,
    highPriority: true
  },
  {
    id: 1,
    label: "2 board games",
    purchased: false,
    highPriority: false
  },
  {
    id: 2,
    label: "20 cups",
    purchased: false,
    highPriority: false
  },
  {
    id: 3,
    label: "Test",
    purchased: false,
    highPriority: false
  }

])
const characterCount = computed(() => {
  return newItem.value.length
})
const reversedItems = computed(() => {
  // [...items] es una copia de items para no modificar el original (spread operator)
  return [...items.value].reverse()
})
const newItem = ref('')
function addItem(item: string){
  items.value.push(
    {
      id: items.value.length,
      label: item,
      purchased: false,
      highPriority: newItemHighPriority.value
    }
  )
  newItem.value = ''
  newItemHighPriority.value = false
}
function delItem(id: number){
  items.value = items.value.filter(item => item.id !== id )
}
watch(() => props.editing, (newVal) => {
  editing.value = newVal ?? false
})
</script>

<template>
  <form v-if="editing" @submit.prevent="addItem(newItem)" class="add-item-form">
    <input required v-model="newItem" type="text" placeholder="Add an item">
    <input id="priority" type="checkbox" v-model.number="newItemHighPriority"/>
    <label for="priority">High Priority</label>
    <button class="btn btn-primary">
      Save item
    </button>
  </form>
  <p v-if="editing" class="counter">
    {{ characterCount }}/200
  </p>
  {{editing ? newItem : ''}}
  <ul v-if="items.length > 0">
    <li 
      v-for="item in reversedItems"
      :key="item.id"
      :class="{strikeout: item.purchased, priority: item.highPriority}"
      @click="item.purchased = !item.purchased"
    >{{item.label}} <span v-if="editing" @click="delItem(item.id)" style="margin-left: 15px;color:red">[eliminar]</span></li>
  </ul>
  <p v-else>No items</p>
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
