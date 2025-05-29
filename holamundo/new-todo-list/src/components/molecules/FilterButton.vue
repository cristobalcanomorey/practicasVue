<script lang="ts" setup>
import BaseButton from '@/components/atoms/BaseButton.vue';
import type { TaskFilter } from '@/types';

const props = defineProps<{
	filter: TaskFilter
	activeFilter: TaskFilter
}>()

const emit = defineEmits<{
	setFilter: [filter: TaskFilter]
}>()
</script>

<template>
	<BaseButton :type="'button'" class="filterButton"
		:class="{ active: filter === activeFilter, priority: activeFilter === 'priority' }"
		@click="emit('setFilter', filter)">
		<slot></slot>
	</BaseButton>
</template>

<style scoped>
.filterButton {
	margin-right: 15px;

}

.active {
	background-color: #00bcd4;
}

.active.priority {
	background-color: gold;
}
</style>