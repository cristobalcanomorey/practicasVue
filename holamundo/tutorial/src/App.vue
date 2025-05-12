<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { ref, computed } from 'vue'
import  ShoppingList  from './components/ShoppingList.vue'
import UrlForm from './components/urlForm.vue'
import ReactivityFundamentals from './components/ReactivityFundamentals.vue'
const header = ref('Shopping List App')
const editing = ref(false)
const toggleForm = () => {
  editing.value = !editing.value
}
</script>

<template>
  <div class="header">
    <h1>{{ header }}</h1>
    <button @click="toggleForm" class="btn btn-primary">
      {{ editing ? 'Cancel' : 'Edit' }}
    </button>
  </div>
  <ShoppingList :editing="editing" />
  <UrlForm />
  <h1>Counter</h1>
  <div class="centered">
    <ReactivityFundamentals />
  </div>
</template>

<style scoped>
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
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
