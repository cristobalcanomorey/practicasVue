<script setup lang="ts">
import CarpetaForm from '@/components/ComandoForm.vue'
import { ref, provide } from 'vue'
import TreeItem from './components/TreeItem.vue'
import { Comando } from '@/classes/comandos'
import type { TreeNode } from '@/types/TreeNode'

const treeData = ref<TreeNode>({
	name: 'My Tree',
	children: [
		{ name: 'hello', children: null },
		{ name: 'world', children: null },
		// {
		//   name: 'child folder',
		//   children: [
		//     {
		//       name: 'child folder',
		//       children: [{ name: 'hello' }, { name: 'world' }]
		//     },
		//     { name: 'hello' },
		//     { name: 'world' },
		//     {
		//       name: 'child folder',
		//       children: [{ name: 'hello' }, { name: 'world' }]
		//     }
		//   ]
		// }
	],
})

const wd = ref<string>('/' + treeData.value.name)
const openedFolders = ref<string>(wd.value)
const listChildrenInWD = ref<boolean>(false)

// no usar con refs
const pwd = ref<Comando>(new Comando(0, 'Muestra el directorio actual', 'pwd', '', [], pwdAction))
const ls = ref<Comando>(new Comando(1, 'Lista de subcarpetas', 'ls', '', [], lsAction))
const touch = ref<Comando>(new Comando(2, 'Crea un archivo nuevo', 'touch', '', [], touchAction))
const mkdir = ref<Comando>(new Comando(3, 'Crea una nueva carpeta', 'mkdir', '', [], mkdirAction))
const cd = ref<Comando>(new Comando(4, 'Cambia de directorio', 'cd', '', [], cdAction))

const comandos = ref<Comando[]>([]) // lista normal

const currentComando = ref<Comando | undefined>(new Comando())

const newFolder = ref<TreeNode>({
	name: '',
	children: [],
})
const file = ref<string>('')

comandos.value.push(pwd.value)
comandos.value.push(ls.value)
comandos.value.push(touch.value)
comandos.value.push(mkdir.value)
comandos.value.push(cd.value)

function cdAction() {
	// wd.value = wd.value + '/' + cd.value.option
	let dirList = wd.value.split('/')
	let changeList = cd.value.option.split('/')
	changeList.forEach((change)=>{
		if(change == '..'){
			dirList.pop()
		} else if(change) {
			dirList.push(change)
		}
	})
	wd.value = dirList.join('/')
}

function mkdirAction() {
	newFolder.value.name = mkdir.value.option
}

function pwdAction() {
	console.log('$ ', wd.value)
}

function lsAction() {
	openedFolders.value = wd.value
	listChildrenInWD.value = true
}

function touchAction() {
	file.value = touch.value.option
	touch.value.args.forEach((arg) => {
		file.value = arg // no se crea uno nuevo por cada iteración, no funciona
	})
	console.log('nuevo archivo: ' + file.value)
}

// function* walkTreeData(root) {
// 	if (root === null) return

// 	const stack = [root]
// 	while (stack.length) {
// 		const item = stack.pop()
// 		yield item
// 		if (item.right) stack.push(item.right)
// 		if (item.left) stack.push(item.left)
// 	}
// }

function runComando(comando: Comando) {
	currentComando.value = comandos.value.find((cooma) => {
		return cooma.cname === comando.cname
	})
	if (currentComando.value == undefined) {
		console.log('No es un comando correcto')
		return
	}
	currentComando.value.args = comando.args
	currentComando.value.option = comando.option

	if (currentComando.value) {
		currentComando.value.action()
	}
}
function handleChildShownEmit(){
	listChildrenInWD.value = false
}
</script>

<template>
	<header>
		<img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

		<div class="wrapper">
			<CarpetaForm @handleComando="(comando) => runComando(comando)" />
		</div>
	</header>

	<main>
		<ul>
			<TreeItem
				class="item"
				:model="treeData"
				:currentDirectory="wd"
				:openFolder="openedFolders"
				:newFile="file"
				:newFolder="newFolder"
				:parentDirectory="treeData.name"
				:listChildrenInWD="listChildrenInWD"
				@childShown="handleChildShownEmit"
			/>
		</ul>
	</main>
</template>

<style scoped>
header {
	line-height: 1.5;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}
}
</style>
