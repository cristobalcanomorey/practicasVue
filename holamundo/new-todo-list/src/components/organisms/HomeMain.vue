<script lang="ts" setup>
import FilterButton from "@/components/molecules/FilterButton.vue";
import TaskForm from "@/components/molecules/TaskForm.vue";
import TaskList from "@/components/molecules/TaskList.vue";
import type { Task, TaskFilter } from "@/types";
import { computed, ref } from "vue";
import { apiDelTask, apiGetTasks, apiPutTask, apiUpdateTask  } from "@/services/homeApi";
import TraducirTexto from "../molecules/TraducirTexto.vue";

const page = 'home'
const items = ref<Task[]>(apiGetTasks());
const filter = ref<TaskFilter>('all')
const doneItems = computed<Task[]>(() => {
	return items.value.filter((item) => { return item.done })
})
const pendingItems = computed<Task[]>(() => {
	return items.value.filter((item) => { return !item.done })
})
const priorityItems = computed<Task[]>(() => {
	return items.value.filter((item) => { return item.priority })
})

const filteredItems = computed(() => {
	switch (filter.value) {
		case 'all':
			return items.value
		case 'completed':
			return doneItems.value
		case 'todo':
			return pendingItems.value
		case 'priority':
			return priorityItems.value
	}
	return items.value
})

let i = 0;
function addItem(item: string, priority: boolean) {
	const newTask = {
		id: i,
		title: item,
		done: false,
		priority: priority
	} as Task
	if (priority) {
		items.value.unshift(newTask);
	} else {
		items.value.push(newTask);
	}
	i++;
	// Put en API
	apiPutTask(newTask)
}

function handleRemove(task: Task) {
	items.value = items.value.filter((it) => {
		return it.id !== task.id
	})
	i--
	// DELETE en API
	apiDelTask(task)
}

function toggleDone(task: Task) {
	task.done = !task.done

	apiUpdateTask(task)
}
function setFilter(newFilter: TaskFilter) {
	filter.value = newFilter
}
</script>

<template>
	<main>
		<TaskForm :items @add="addItem" />
		<TaskList v-model:list="filteredItems" @remove="task => handleRemove(task)" @done="task => toggleDone(task)" />
		<div>
			<h1 v-if="items.length === 0">Crea una nueva tarea</h1>
			<h1 v-else-if="doneItems.length === items.length">Todas completadas</h1>
			<h1 v-else>
				<!-- <i18n-t keypath="home.quedanNPendientes" :values="{n: items.length - doneItems.length }">
					<span></span>
				</i18n-t> -->
				<!-- Quedan <span>{{ items.length - doneItems.length }}</span> pendientes -->
			</h1>
			<FilterButton filter='all' :active-filter="filter" @set-filter="setFilter">Todas</FilterButton>
			<FilterButton filter='todo' :active-filter="filter" @set-filter="setFilter">Pendientes</FilterButton>
			<FilterButton filter='completed' :active-filter="filter" @set-filter="setFilter">Completadas</FilterButton>
			<FilterButton filter='priority' :active-filter="filter" @set-filter="setFilter">Prioritarias</FilterButton>
			<br>
			<!-- <TraducirTexto :page="page" label="noExiste">Traduccion que no existe</TraducirTexto> -->
			<br>
			<!-- <TraducirTexto :page="page" label="noExiste">otra traduccion que no existe</TraducirTexto> -->
			<!-- <BaseButton :type="'button'" :class="{ active: filter === 'all' }" @click="emit('setFilter', filter)">Todas</BaseButton>
			<BaseButton :type="'button'" :class="{ active: filter === 'todo' }" @click="filter = 'todo'">Pendientes
			</BaseButton>
			<BaseButton :type="'button'" :class="{ active: filter === 'completed' }" @click="filter = 'completed'">
				Completadas</BaseButton>
			<BaseButton :type="'button'" :class="{ active: filter === 'priority' }" @click="filter = 'priority'">
				Prioritarias</BaseButton> -->
		</div>
	</main>
</template>

<style scoped>
main {
	width: 80%;
}

span {
	color: red;
}
</style>
