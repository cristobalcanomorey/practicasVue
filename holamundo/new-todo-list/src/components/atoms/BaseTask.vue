<script lang="ts" setup>
import type { Task } from '@/types';

const props = defineProps<{
	item: Task
}>()
</script>

<template>
	{{ item.title }}
</template>
