<script setup lang="ts">
import type { ListState } from '@/types/todo';


// const [toggleOcultarDones, hayCompletados, hayOcultos] = defineModel('models');
const emit = defineEmits(['toggle-completados'])

function handleClick() {
    emit('toggle-completados');
}

const estadoGeneral = defineProps<ListState>()

</script>

<template>
    <button v-if="hayCompletados" class="btn" @click="handleClick">{{ (hayOcultos? 'Mostrar ': 'Ocultar ') + 'completados' }}</button>
    <span v-else>Haz click en una tarea para marcarla como completada</span>
</template>