<script setup lang="ts">
import type { ListState } from '@/types/todo';

const emit = defineEmits(['toggle-completados'])

// Avisa al padre de que ha de mostrar u ocultar las tareas completadas
function handleClick() {
    emit('toggle-completados');
}

const estadoGeneral = defineProps<ListState>()

</script>

<template>
    <button :title="'Controla la visibilidad de las tareas'" v-if="hayCompletados" class="btn" @click="handleClick">{{ (hayOcultos? 'Mostrar ': 'Ocultar ') + 'completados' }}</button>
    <span v-else>Haz click en una tarea para marcarla como completada</span>
</template>