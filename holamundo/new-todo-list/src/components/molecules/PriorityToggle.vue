<script lang="ts" setup>
import BaseCheckLabel from '@/components/atoms/BaseCheckLabel.vue';
import BaseCheck from '@/components/atoms/BaseCheck.vue';
import { ref } from 'vue';

const id = 'check'

const newValue = ref<boolean>(false)

function getValue(){
	return newValue.value
}

function resetValue(){
	newValue.value = false
}

defineExpose({getValue, resetValue})

</script>

<template>
	<div class="toggle-group">
		<BaseCheckLabel :f="id">Prioritario</BaseCheckLabel>
		<BaseCheck :id="id" v-model:new-value="newValue" />
	</div>
</template>

<style scoped>
input {
	margin-left: 5px;
}
</style>