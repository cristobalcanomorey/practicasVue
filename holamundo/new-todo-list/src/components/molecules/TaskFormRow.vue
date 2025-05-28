<script lang="ts" setup>
import { ref } from 'vue'
import BaseInput from '@/components/atoms/BaseInput.vue'
import BaseLabel from '@/components/atoms/BaseLabel.vue'
import WordCount from '@/components/atoms/WordCount.vue'

const id = ref<string>('cool-input')

const value = ref<string>('')
const max = 20

defineExpose({value})
</script>

<template>
  <div class="input-group">
    <BaseInput
      :id="id"
      v-model:value="value"
      v-model:max="max"
      :required="true"
      :placeholder="''"
    />
    <BaseLabel :f="id">Nueva tarea</BaseLabel>
    <WordCount v-model:value="value" v-model:max="max" />
  </div>
</template>

<style scoped>
.input-group {
  position: relative;
  margin: 2rem 0;
  width: 100%;
  max-width: 300px;
}
.input-group input:focus + label,
.input-group input:valid + label {
  top: -10px;
  font-size: 0.8rem;
  color: #00bcd4;
}
</style>
