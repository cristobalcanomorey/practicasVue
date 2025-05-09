<script setup lang="ts">
  import { ref } from 'vue'
  import Contador from './components/ContadorComponent.vue'
  const target = ref<number | null>(null)
  const newTarget = ref(null)
  const regresivo = ref(false) // Progresivo por defecto
  const animationSpeed = ref(0.5) // actualizar cada 0.5 segundos
  const key = ref(0)

  const setTarget = () => {
    target.value = newTarget.value
    // Cambiar la key fuerza a Vue a destruir y volver a montar el componente hijo
    key.value++
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
  <div>
    <h1>Contador</h1>

    <form @submit.prevent="setTarget">
      <input type="number" v-model.number="newTarget" placeholder="Set target" />
      <button type="submit">Contar</button>
      <br>
      <input id="regresivo" type="checkbox" v-model="regresivo"/>
      <label for="regresivo">Regresivo</label>
      <br>
      <br>
    
      <label for="animationSpeed">Velocidad</label>
      <br>
      <span>
        rápido
        <input id="animationSpeed" type="range" v-model.number="animationSpeed" min="0.1" max="1" step="0.1" placeholder="Velocidad" />
        lento
      </span>
    </form>
  </div>
  <div v-if="target !== null">
    <p :class="[regresivo ? 'text-red-500' : 'text-green-500']">
      <span v-if="!regresivo">Cuenta hasta {{ target }}</span>
      <span v-else>Cuenta hasta {{ 0 }}</span>
    </p>
     <p>Contador: <Contador :target="target" :animationSpeed="animationSpeed" :regresivo="regresivo" :key="key"  /></p>
   </div>
</template>

<style scoped>
.text-red-500 {
  color: #f00;
}
.text-green-500 {
  color: #0f0;
}
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
