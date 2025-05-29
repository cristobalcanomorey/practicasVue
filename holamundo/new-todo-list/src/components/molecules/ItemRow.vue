<script lang="ts" setup>
import BaseTask from "@/components/atoms/BaseTask.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import type { Task } from "@/types";

const props = defineProps<{
	item: Task;
}>();

const emit = defineEmits<{
	remove: [Task],
	done: [Task]
}>()

function handleRemove() {
	console.log("Eliminando tarea...");
	emit('remove', props.item)
}
// function handleDone(){
// 	emit('done', props.item)
// }
</script>

<template>
	<li class="item" :class="{ priority: item.priority, done: item.done }" @click.prevent="emit('done', item)">
		<div>
			<span>
				<BaseTask :item="item" />
			</span>
			<BaseButton :type="'button'" @click.prevent="handleRemove()" :class="'remove'"> X </BaseButton>
		</div>
	</li>
</template>

<style scoped>
.priority{
	border: 1px solid gold;
}

.priority.done{
	background-color: gold;
}

.done{
	background-color: #00bcd4;
	text-decoration: line-through;
}

li{
	border-radius: 0 100px 100px 0 ;
	border: 1px solid #00bcd4;
	margin-bottom: 5px;
	padding-left: 5px;
}

div{
	display: flex;
}
span{
	margin: auto 0;
}


</style>
