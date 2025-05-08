<script setup lang="ts">
  import { ref } from 'vue'
  import Contador from './components/ContadorComponent.vue'
  // import IncrementalAnimation from './components/IncrementalAnimation.vue'
  const target = ref(0)
  const newTarget = ref(0)
  const regresivo = ref(true)
  const animationTime = ref(0.1)
  const componentKey = ref(0)

  const setTarget = () => {
    target.value = newTarget.value
    componentKey.value++
  }
  //TODO: hacer que cambie la dirección del contador sin reiniciar el componente
  const changeDirection = () => { 
    componentKey.value++
  }
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <!-- <HelloWorld :msg="msg" :num="target" /> -->
   <p>
    <!-- <IncrementalAnimation :start="0" :target="target" :animationTime="1" /> -->
   </p>
   <div>
      <form @submit.prevent="setTarget">
        <input type="number" v-model.number="newTarget" placeholder="Set target" />
        <button type="submit">Contar</button>
        <br>
        <input type="checkbox" v-model="regresivo" @change="changeDirection"/>
        <label for="regresivo">Regresivo</label>
      </form>
   </div>
   <p>Empieza desde 
    <span v-if="regresivo">{{ target }}</span>
    <span v-else>{{ 0 }}</span>
  </p>
   <p>Contador: <Contador :target="target" :animationTime="animationTime" :regresivo="regresivo" :key="componentKey"/></p>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
