<script setup lang="ts">
import CarpetaForm from '@/components/CarpetaForm.vue'
import {ref} from 'vue'
import TreeItem from './components/TreeItem.vue'
import type { Comando } from '@/types/comandos'

const treeData = ref({
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'world' },
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
  ]
})

const wd = ref<string>('My Tree')

const pwd = ref<Comando>({
  id: 0,
  cname: 'pwd',
  attr: [],
  action: pwdAction
})

const comandos = ref<Comando[]>([])

const currentComando = ref<Comando>()

comandos.value.push(pwd.value)

function pwdAction(){
  console.log(wd.value)
}

function runComando(comando: string){
  currentComando.value = comandos.value.find((cooma)=>{
    return cooma.cname === comando
  })

  if(currentComando.value){
    currentComando.value.action()
  }
}

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <CarpetaForm @handleComando="comando => runComando(comando)" />
    </div>
  </header>

  <main>
    <ul>
      <TreeItem class="item" :model="treeData" />

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
