<script setup lang="ts">
import { reactive } from 'vue'
const state = reactive({count: 0})
const increment = () => {
  state.count++ // Con reactive no es necesario usar .value
}
</script>
<template>
    <p>{{ state.count }}</p>
    <button @click="increment">Increment count</button>
</template>