<script lang="ts" setup>
const props = defineProps<{
	f: string
}>()
</script>

<template>
	<label :for="f">
		<slot>Default Label</slot>
	</label>
</template>

<style scoped>
label {
	position: absolute;
	top: 12px;
	left: 0;
	color: #aaa;
	font-size: 1rem;
	pointer-events: none;
	transition: 0.3s ease;
}
</style>