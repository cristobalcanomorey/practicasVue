<script lang="ts" setup>
import BaseButton from '@/components/atoms/BaseButton.vue'
import TaskForm from '@/components/organisms/TaskForm.vue';
import TaskList from '@/components/organisms/TaskList.vue';
import {ref} from 'vue'
const items = ref<string[]>(['a','b'])
</script>

<template>
  <div>
    <TaskForm v-model:list="items" />
	<TaskList v-model:list="items" />
  </div>
</template>

<style></style>
