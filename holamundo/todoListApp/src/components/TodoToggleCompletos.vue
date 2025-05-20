<script setup lang="ts">

const [toggleOcultarDones, hayCompletados, hayOcultos] = defineModel('models');

function toggleDones() {
    toggleOcultarDones.value = !toggleOcultarDones.value
}
</script>

<template>
    <button v-if="hayCompletados" class="btn" @click="toggleDones">{{ (hayOcultos? 'Mostrar ': 'Ocultar ') + 'completados' }}</button>
    <span v-else>Haz click en una tarea para marcarla como completada</span>
</template>