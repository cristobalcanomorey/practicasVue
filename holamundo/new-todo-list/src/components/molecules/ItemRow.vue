<script lang="ts" setup>
import BaseTask from '@/components/atoms/BaseTask.vue';
import BaseButton from '@/components/atoms/BaseButton.vue'

const props = defineProps<{
	item: string
}>()

function handleRemove(){
	console.log('Eliminando tarea...')
}

</script>

<template>
	<li class="item">
		<BaseTask :item="item"/>
		<BaseButton :type="'button'" @click="handleRemove()"> X </BaseButton>
	</li>
</template>