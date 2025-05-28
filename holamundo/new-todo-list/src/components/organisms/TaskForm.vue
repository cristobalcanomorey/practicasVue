<script lang="ts" setup>
import BaseButton from '@/components/atoms/BaseButton.vue';
import PriorityToggle from '@/components/molecules/PriorityToggle.vue';
import TaskFormRow from '@/components/molecules/TaskFormRow.vue';
import { computed, ref } from 'vue';

const items = defineModel<string[]>('list')

const value = ref<null | string>(null)

const newTask = computed(() => value.value? value.value : '')

function add(){
	if(value.value !== null && items.value !== undefined){
		items.value.push(newTask.value)
		console.log(newTask.value)
	}
}
</script>

<template>
	<div class="form-container">
		<form id="list-form" class="add-list-form" @submit.prevent="add()">
			<TaskFormRow ref="value"/>
			<PriorityToggle/>
			<BaseButton :type="'submit'">Crear</BaseButton>
		</form>
	</div>
</template>

<style scoped>
form {
	display: flex;
}
.toggle-group{
	display: flex;
	margin: auto 15px;
}
</style>