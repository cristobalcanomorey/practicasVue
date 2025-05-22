<script setup lang="ts">
import { ref } from 'vue'

const newList = ref<string>('')

const emit = defineEmits(['add'])

// Le pasa al padre una nueva lista a crear
function add() {
  if (newList.value !== '') {
    emit('add', newList.value)
    newList.value = ''
  }
}
</script>

<template>
  <form id="list-form" class="add-list-form" @submit.prevent="add()">
    <button class="btn btn-primary" type="submit">Crear nueva lista</button>
    <input type="text" v-model.trim="newList" placeholder="Añade una lista nueva" required /><br>
  </form>
</template>

<style scoped>

</style>