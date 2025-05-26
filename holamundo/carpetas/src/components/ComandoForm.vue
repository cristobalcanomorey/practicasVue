<script lang="ts" setup>
import { ref } from 'vue'
import { Comando } from '@/classes/comandos'

const emit = defineEmits(['handleComando'])

const newCAction = ref<string>('')

// const newComando = ref<Comando>(new Comando())


function handleComando() {
	let cParts = newCAction.value.split(' ')
	console.log(cParts)
	const [cname = '', option = '', ...args] = newCAction.value.trim().split(/\s+/)
	let newComando = new Comando()
	newComando.cname = cname
	newComando.option = option
	newComando.args = args

	emit('handleComando', newComando)
	newCAction.value = ''
}
</script>

<template>
	<form @submit.prevent="handleComando()">
		<input type="text" v-model.trim="newCAction" placeholder="$" required/>
	</form>
</template>
