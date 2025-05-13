<script setup lang="ts">
import {reactive} from 'vue'
import type { Todo } from '@/types/todo'
const props = defineProps<{
    id: number,
    remove: (id: number) => void
}>()

</script>
<template>
  <button class="btn btn-cancel" @click="remove(id)">Eliminar</button>
</template>

<style scoped>
.btn-cancel {
  background: #ef5753;
  color: #fff;
  padding: 0.3rem;
}

.btn-cancel:hover {
  background: #e3342f;
  color: #fff;
}

</style>