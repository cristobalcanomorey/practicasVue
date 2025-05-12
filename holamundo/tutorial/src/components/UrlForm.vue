<script setup lang="ts">
import { ref } from 'vue'
const newLink = ref('')

</script>
<template>
    <h1>Dynamic Link</h1>
    <input v-model.trim="newLink" type="text">
    <a :href="newLink">Dynamic Link</a>	
</template>