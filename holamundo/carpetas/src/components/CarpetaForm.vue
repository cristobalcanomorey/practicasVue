<script lang="ts" setup>
import {ref} from 'vue'

const emit = defineEmits(['handleComando'])

const newComando = ref<string>('')

function handleComando(){
    emit('handleComando', newComando.value)
    newComando.value = ''
}
</script>

<template>
    <form @submit.prevent="handleComando()">
        <input type="text" v-model="newComando">
    </form>
</template>