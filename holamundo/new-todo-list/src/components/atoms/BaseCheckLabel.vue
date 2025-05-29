<script lang="ts" setup>
const props = defineProps<{
	f: string;
}>();
</script>

<template>
	<label :for="f">
		<slot>Default Label</slot>
	</label>
</template>

<style scoped>
label {
	color: #aaa;
	font-size: 1rem;
	pointer-events: none;
}
</style>
