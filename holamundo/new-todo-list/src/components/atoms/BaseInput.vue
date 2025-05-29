<script lang="ts" setup>
import { watch } from "vue";

const props = defineProps<{
	type?: string | undefined;
	placeholder: string;
	required: boolean;
	id: string;
}>();

const text = defineModel<string>("inputVal");
const max = defineModel<number>("max");

watch(text, (val) => {
	if (val !== undefined && max.value !== undefined && val.length > max.value) {
		text.value = val.slice(0, max.value); // recorta el texto si supera el límite
	}
});
</script>

<template>
	<input v-model.trim="text" :id="id" :type="type != undefined ? type : 'text'" :placeholder="placeholder"
		:required="required" name="newTask" />
</template>

<style scoped>
input {
	width: 100%;
	padding: 12px 12px 12px 0;
	border: none;
	border-bottom: 2px solid #ccc;
	background: transparent;
	font-size: 1rem;
	outline: none;
	transition: all 0.3s ease;
}

input:focus {
	border-bottom: 2px solid #00bcd4;
}
</style>
