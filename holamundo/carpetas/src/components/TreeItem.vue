<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import type { TreeNode } from '@/types/TreeNode'

const props = defineProps<{
	model: TreeNode
	openFolder: string
	newFile: string
	newFolder: TreeNode
	parentDirectory: string
}>()

const isWD = computed((): boolean => {
	return (
		props.openFolder !== undefined &&
		props.model !== undefined &&
		props.openFolder === props.model.name
	)
})
const clickOpenF = ref<boolean>(false)
const isOpen = computed((): boolean => {
	if (clickOpenF.value) {
		return clickOpenF.value
	} else {
		return isWD.value
	}
})

watch(
	() => isOpen.value,
	(newValue) => {
		if (newValue) {
			props.model?.children?.forEach((hijo: TreeNode) => {
				console.log('$ ' + hijo.name)
			})
		}
	},
)

watch(
	() => props.newFile,
	(newValue) => {
		if (newValue !== undefined && newValue !== '') {
			addChild(newValue)
		}
	},
)

watch(
	()=> props.newFolder.name,
	(newValue) => {
		if (newValue !== undefined && newValue !== '' && isWD.value) {
			console.log('creando carpeta '+ newValue)
		}
	}
)

const isFolder = computed(() => {
	if (props.model == undefined) return null
	return props.model.children && props.model.children.length
})

function toggleManually() {
	clickOpenF.value = !clickOpenF.value
	console.log('toggledManually ', clickOpenF.value)
}

function changeType() {
	if (!isFolder.value && props.model != undefined) {
		props.model.children = []
		addChildManually()
		clickOpenF.value = true
	}
}

function addChild(fname: string) {
	if (props.model != undefined) {
		props.model.children?.push({ name: fname })
	}
}

function addChildManually() {
	addChild('new stuff')
}
</script>

<template>
	<li>
		<div :class="{ bold: isWD }" @click="toggleManually" @dblclick="changeType">
			{{ model?.name }}
			<span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
		</div>
		<ul v-show="isOpen" v-if="isFolder">
			<!--
				A component can recursively render itself using its
				"name" option (inferred from filename if using SFC)
			-->
			<TreeItem
				class="item"
				v-for="model in model?.children"
				:model="model"
				:openFolder="openFolder"
				:newFile="newFile"
				:newFolder="newFolder"
				:parentDirectory="model.name"
			/>
			<li class="add" @click="addChildManually">+</li>
		</ul>
	</li>
</template>

<style scoped>
.item {
	cursor: pointer;
	line-height: 1.5;
}
.bold {
	font-weight: bold;
}
</style>
