<script lang="ts" setup>
import BaseCheckLabel from '@/components/atoms/BaseCheckLabel.vue';
import BaseCheck from '@/components/atoms/BaseCheck.vue';

const id = 'check'



</script>

<template>
	<div class="toggle-group">
		<BaseCheckLabel :f="id">Prioritario</BaseCheckLabel>
		<BaseCheck :id="id" ref="value"/>
	</div>
</template>

<style scoped>
input{
	margin-left: 5px;
}

</style>