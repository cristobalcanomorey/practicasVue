<script setup lang="ts">
  import { ref } from 'vue'
  type RegresivoState = -1 | 0 | 1
  
  import Contador from './components/ContadorComponent.vue'
  const target = ref<number | null>(null)
  const newTarget = ref(null)
  const regresivo = ref<RegresivoState>(0) // Progresivo por defecto
  const animationSpeed = ref(0.5) // actualizar cada 0.5 segundos por defecto
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
      <input id="regresivo" type="checkbox" v-model.number="regresivo"/>
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
  <!-- ¿Por qué no se oculta cuando dejo el target en null desde el formulario? -->
  <div v-if="target !== null">
    <p :class="[regresivo ? 'text-red-500' : 'text-green-500']">
      <span v-if="!regresivo">Cuenta hasta {{ target }}</span>
      <span v-else>Cuenta hasta {{ 0 }}</span>
    </p>
     <h1 :class="[regresivo ? 'text-red-500' : 'text-green-500']"> <Contador :target="target" :animationSpeed="animationSpeed" :regresivo="regresivo" :key="key"  /></h1>
     <p>Contador regresivo: {{ regresivo }}</p>
     <p>Velocidad: {{ animationSpeed }}</p>
  </div>
  <div v-if="target !== null">
    <h2>Otras pruebas</h2>
    <p>Contador sin opciones y con velocidad por defecto</p>
    <h1 class='text-green-500'> <Contador :target="target" :key="key"  /></h1>
    <p>Regresión definiendo un target menor que el start</p>
    <h1 class='text-red-500'> <Contador :start="100" :target="5" :animationSpeed="animationSpeed" :key="key" /></h1>
    <p> Contador empezando por 50 y terminando en 200</p>
    <h1 :class="[regresivo ? 'text-red-500' : 'text-green-500']"> <Contador :start="50" :target="200" :animationSpeed="animationSpeed" :regresivo="regresivo" :key="key" /></h1>


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
