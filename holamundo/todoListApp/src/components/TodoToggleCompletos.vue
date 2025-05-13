<script setup lang="ts">
import { useTodos } from '@/composables/useTodos'
import { ref, computed, watch } from 'vue'
const {
    todos,
    toggleOcultarDones
} = useTodos()

const hayCompletados = computed(() => (todos.value.filter(t => t.done).length > 0))
const hayOcultos = computed(() => (todos.value.filter(t => t.oculto).length > 0))

const btnText = computed(() => ((hayOcultos? 'Mostrar ': 'Ocultar ') + 'completados'))

</script>

<template>
    <button v-if="hayCompletados" class="btn" @click="toggleOcultarDones()">{{ btnText }}</button>
    <span v-else>Haz click en una tarea para marcarla como completada</span>
</template>