<script setup lang="ts">
// import TodoList from '@/components/TodoList.vue';
import TodoListGroup from '@/components/TodoListGroup.vue';
import TodoToggleCompletos from '@/components/TodoToggleCompletos.vue';
import { ref } from 'vue';
import type { Options } from '@/types/todo';

const options = ref<Options>({
  toggleOcultarDones: false,
  hayCompletados: false,
  hayOcultos: false
});
const toggleOcultarDones = ref(false);
const hayCompletados = ref(false);
const hayOcultos = ref(false);
function toggleCompletados(){
    toggleOcultarDones.value = !toggleOcultarDones.value
    console.log('toggleCompletados', toggleOcultarDones.value);
}

function handleDone(){
  
}

</script>

<template>
    <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <h1>Lista de tareas</h1>
      <TodoToggleCompletos @toggle-completados="toggleCompletados()" :hayCompletados="hayCompletados" :hayOcultos="hayOcultos" :toggleOcultarDones="toggleOcultarDones" />
    </div>
  </header>

  <main>
    <TodoListGroup :hayCompletados="hayCompletados" :hayOcultos="hayOcultos" :toggleOcultarDones="toggleOcultarDones" @toggleDone="handleDone()"/>
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