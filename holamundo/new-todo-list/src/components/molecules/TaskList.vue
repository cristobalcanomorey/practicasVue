<script lang="ts" setup>
import ItemRow from "@/components/molecules/ItemRow.vue";
import type { Task } from "@/types";

const items = defineModel<Task[]>("list");

const emit = defineEmits<{
	remove: [Task],
	done: [Task]
}>()

function handleRemove(task: Task) {
	emit('remove', task)
}

// function handleDone(task: Task) {
// 	emit('done', task)
// }

</script>

<template>
	<TransitionGroup tag="ul" name="fade" class="container">
		<ItemRow v-for="item in items" :item="item" :key="item.id" @remove="task => handleRemove(task)"
			@done="emit('done', item)" />
	</TransitionGroup>
</template>

<style scoped>
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
	/* position: absolute; */
}

ul {
	padding-right: 15px;
}
</style>
