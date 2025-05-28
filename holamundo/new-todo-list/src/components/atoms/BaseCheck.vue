<script lang="ts" setup>
	import {ref} from 'vue'
	const props = defineProps<{
		id: string
	}>()

	const value = ref<boolean>(false)
	defineExpose({value})
</script>

<template>
	<input :id="id" type="checkbox" v-model="value">
</template>