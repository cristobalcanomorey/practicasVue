<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import type { TreeNode } from '@/types/TreeNode'

const props = defineProps<{
	model: TreeNode
	currentDirectory: string
	openFolder: string
	newFile: string
	newFolder: TreeNode
	parentDirectory: string
	listChildrenInWD: boolean
}>()

const isWD = computed((): boolean => {
	return (
		props.currentDirectory !== undefined &&
		props.model !== undefined &&
		props.currentDirectory.split('/').pop() === props.model.name
	)
})

const isInRuta = computed(():boolean => {
	return props.openFolder.includes(props.model.name)
})
const clickOpenF = ref<boolean>(false)
const isOpen = computed((): boolean => {
	if (clickOpenF.value) {
		return clickOpenF.value
	} else {
		return isInRuta.value
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
		if (newValue !== undefined && newValue !== '' && isWD.value) {
			if(props.model?.children !== null){
				addChild(newValue)
			} else{
				console.log('No se puede crear un archivo dentro de un archivo')
			}
		}
	},
)

watch(
	()=> props.newFolder.name,
	(newValue) => {
		if (newValue !== undefined && newValue !== '' && isWD.value) {
			if(props.model?.children !== null){
				console.log('creando carpeta '+ newValue)
				addFolder(newValue)
			} else{
				console.log('No se puede crear una carpeta dentro de un archivo')
			}
		}
	}
)

const emit = defineEmits(['childShown'])
watch(
	() => props.listChildrenInWD,
	(newValue) => {
		if(newValue && isWD.value){
			props.model?.children?.forEach((hijo: TreeNode) => {
				console.log('$ ' + hijo.name)
			})
			emit('childShown')
		}
	}
)


const isFolder = computed(() => {
	if (props.model == undefined) return null
	return props.model.children !== null
})

function toggleManually() {
	clickOpenF.value = !clickOpenF.value
	console.log('toggledManually ', clickOpenF.value)
}

function changeTypeManually() {
	if (!isFolder.value && props.model != undefined) {
		props.model.children = []
		// addChildManually()
		clickOpenF.value = true
	}
}

function addFolder(fname: string){
	if(props.model != undefined && props.model.children !== null && isWD.value){
		props.model.children.push( {
			name: fname,
			children: []
		})
	}
}

function addChild(fname: string) {
	if (props.model != undefined) {
		props.model.children?.push({ name: fname, children: null })
	}
}

function addChildManually() {
	addChild('new stuff')
}

function handleChildShownEmit(){
	emit('childShown')
}
</script>

<template>
	<li>
		<div :class="{ bold: isInRuta }" @click="toggleManually" @dblclick="changeTypeManually">
			{{ model?.name }}
			<span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
			{{ isWD ? '<-' : '' }}
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
				:currentDirectory="currentDirectory"
				:openFolder="openFolder"
				:newFile="newFile"
				:newFolder="newFolder"
				:parentDirectory="model.name"
				:listChildrenInWD="listChildrenInWD"
				@childShown="handleChildShownEmit"
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
