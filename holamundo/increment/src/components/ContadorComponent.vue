<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

type RegresivoState = -1 | 0 | 1
/***
 * @description Componente que cuenta desde un número inicial hasta un número objetivo.
 * @param {number} start - Número inicial o final según si es regresivo o progresivo.
 * @param {number} target - Número inicial o final según si es regresivo o progresivo.
 * @param {number} animationSpeed - Velocidad de la animación en segundos.
 * @param {number} regresivo - Indica si la cuenta es regresiva o progresiva.
 */
const props = withDefaults(
  defineProps<{
    start?: number,
    target: number,
    animationSpeed?: number,
    regresivo?: RegresivoState
  }>(),
  {
      start: 0,
      animationSpeed: 1,
      regresivo: -1
    }
  
  ) 
  
let start = props.start ?? 0
let target = props.target
const targetIsLower = target < start // Si el target es menor que el start, se considera regresivo
const isRegresivo = ref(props.regresivo !== undefined ? props.regresivo === 1 : targetIsLower)
let tmpStart = start // Se guarda el valor de start en una variable temporal
start = targetIsLower ? target : start // Si el start es mayor que el target, se invierten
target = targetIsLower ? tmpStart : target // Si el start es menor que el target, se invierten
const animationSpeed = ref(props.animationSpeed ?? 1)
const segundos = 1000
const ats = ref(animationSpeed.value * segundos) // Tiempo entre cada incremento en milisegundos
console.log('Regresivo es de tipo: ' + typeof props.regresivo) // No debería ser undefined si no se pasa el prop regresivo?

// Si no se pasa el prop regresivo, se define en base a start y target

// Si es regresivo empieza por el target, si no por el start
// const current = ref<number>(0)

const current = ref(isRegresivo.value ? target : start)
console.log('Contador inicial:', current.value)

const direction = ref(isRegresivo.value ? -1 : 1)
const interval = ref<ReturnType<typeof setInterval> | null>(null)

function startCounting() {
  // Si ya hay un intervalo corriendo, lo detiene
  if (interval.value) {
    clearInterval(interval.value)
  }

  interval.value = setInterval(() => {
    // Si es regresivo, se detiene cuando llega al start, si no al target
    const reachedEnd = isRegresivo.value
      ? current.value <= start 
      : current.value >= target

      // Cuando llega al final para el contador
    if (reachedEnd) {
      console.log(isRegresivo.value ? 'Contador regresivo' : 'Contador progresivo')
      clearInterval(interval.value!)
    } else{
      current.value += direction.value

    }
      // current.value += direction.value

  }, ats.value)
}

// Se monta cuando su DOM se ha insertado en el contenedor padre
// No se llama si es de tipo SSR
onMounted(() => {
  startCounting()
})

// Cuando se modifica el valor de props.regresivo se cambia la dirección de la cuenta
watch(() => props.regresivo, (newVal) => {
  console.log('Cambio de dirección:', newVal ? 'Regresivo' : 'Progresivo')
  isRegresivo.value = newVal ?? false 
  direction.value = newVal ? -1 : 1
})

// Cuando se modifica el valor de props.animationSpeed se cambia la velocidad de la cuenta
watch(() => props.animationSpeed, (newVal) => {
    console.log('Cambio de velocidad:', newVal)
    animationSpeed.value = newVal ?? 1
    ats.value = animationSpeed.value * segundos
    if (interval.value) {
        clearInterval(interval.value)
        startCounting()
    }
}, { immediate: true }) // Se llama también cuando se monta el componente

// Cuando se elimina del DOM se detiene el contador
// No se llama si es de tipo SSR
onUnmounted(() => {
  if (interval.value) clearInterval(interval.value)
})
</script>

<template>
    {{ current }}
</template>