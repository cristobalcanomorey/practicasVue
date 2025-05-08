<script setup lang="ts">
import { ref, watch } from 'vue'

const {
    start = 0,
    target,
    animationTime = 1,
    regresivo = false,
} = defineProps<{
    start?: number,
    target: number,
    animationTime?: number,
    regresivo?: boolean
}>()

const segundos = 1000 //ms a s
const ats = animationTime * segundos
const display = ref(regresivo ? target : start)
const current = ref(start)
let interval: ReturnType<typeof setInterval> | null = null

function startCounting() {
    if(start === target){
        console.log('Contador ya en el valor objetivo')
        return
    }
    current.value = start
    display.value = regresivo ? target  : current.value
    console.log('Contador iniciado')
    const interval = setInterval(() => {
        current.value++
        display.value = regresivo ? target - current.value : current.value 
        // resta = Math.abs(current.value - target)
        if(current.value >= target){
            clearInterval(interval)
        }
    }, ats)

}
watch(() => target, () => {
    startCounting()
}, { immediate: true })
// onMounted(() => {
// })
</script>

<template>
    {{ display }}
</template>