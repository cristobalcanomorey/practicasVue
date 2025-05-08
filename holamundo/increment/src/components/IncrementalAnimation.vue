<script setup lang="ts">
    import {ref,onMounted} from 'vue'
    const {start,target,animationTime} = defineProps<{
        start:number,
        target:number,
        animationTime:number
    }>()

    const current = ref(start)
    const segundos = 1000 //ms a s
    const at = animationTime * segundos 
    onMounted(() => {

        const interval = setInterval(() => {
            current.value++
            if(current.value >= target.value){
                clearInterval(interval)
            }
        }, at)
    })
</script>

<template>
{{ current }} - {{ target }} - {{ animationTime }}
</template>