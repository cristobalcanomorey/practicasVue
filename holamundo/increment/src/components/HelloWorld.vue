<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const {msg,num} = defineProps<{ msg: string, num: number }>()

  const target = ref(num)
  const current = ref(0)
  
  onMounted(() => {
    const duration = 1000
    const steps = 60
    const increment = target.value
    let count = 0

    const interval = setInterval(() => {
      count++
      current.value = Math.round(increment * count)

      if (count >= steps){
        current.value = target
        clearInterval(interval)
      }
    }, duration / steps)
  })

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ current }}</button>
    <p>
      {{ current }}
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
