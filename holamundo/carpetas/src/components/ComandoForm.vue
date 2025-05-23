<script lang="ts" setup>
import { ref } from 'vue'
import { Comando } from '@/classes/comandos'

const emit = defineEmits(['handleComando'])

const newCAction = ref<string>('')

const newComando = ref<Comando>(new Comando())


function handleComando() {
	let cParts = newCAction.value.split(' ')
	console.log(cParts)
	const [cname = '', option = '', ...args] = newCAction.value.trim().split(/\s+/)
	newComando.value.cname = cname
	newComando.value.option = option
	newComando.value.args = args

	emit('handleComando', newComando.value)
	newCAction.value = ''
	newComando.value = new Comando()
}
</script>

<template>
	<form @submit.prevent="handleComando()">
		<input type="text" v-model.trim="newCAction" placeholder="$" required/>
	</form>
</template>
