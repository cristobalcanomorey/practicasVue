<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  start?: number,
  target: number,
  animationSpeed?: number,
  regresivo?: boolean
}>()

const start = props.start ?? 0
const animationSpeed = ref(props.animationSpeed ?? 1)
const segundos = 1000
const ats = ref(animationSpeed.value * segundos)

const current = ref(props.regresivo ? props.target : start)
const direction = ref(props.regresivo ? -1 : 1)
const interval = ref<ReturnType<typeof setInterval> | null>(null)

function startCounting() {
  if (interval.value) clearInterval(interval.value)

  interval.value = setInterval(() => {
    current.value += direction.value

    const reachedEnd = props.regresivo
      ? current.value <= 0
      : current.value >= props.target

    if (reachedEnd) {
      clearInterval(interval.value!)
    }
  }, ats.value)
}

onMounted(() => {
  startCounting()
})

watch(() => props.regresivo, (newVal) => {
  console.log('Cambio de dirección:', newVal ? 'Regresivo' : 'Progresivo')
  direction.value = newVal ? -1 : 1
}, { immediate: true })

watch(() => props.animationSpeed, (newVal) => {
    console.log('Cambio de velocidad:', newVal)
    animationSpeed.value = newVal ?? 1
    ats.value = animationSpeed.value * segundos
    if (interval.value) {
        clearInterval(interval.value)
        startCounting()
    }
}, { immediate: true })

onUnmounted(() => {
  if (interval.value) clearInterval(interval.value)
})
</script>

<template>
    {{ current }}
</template>