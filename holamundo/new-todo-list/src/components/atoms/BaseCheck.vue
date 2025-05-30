<script lang="ts" setup>
const props = defineProps<{
	id: string
}>()

const value = defineModel('newValue')

</script>

<template>
	<input :id="id" type="checkbox" v-model="value">
</template>