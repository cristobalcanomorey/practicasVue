<script lang="ts" setup>
import BaseButton from '@/components/atoms/BaseButton.vue';
import PriorityToggle from '@/components/molecules/PriorityToggle.vue';
import TaskFormRow from '@/components/molecules/TaskFormRow.vue';
import type { Task } from '@/types';
import { useTemplateRef, ref } from 'vue';

const props = defineProps<{
  items: Task[]
}>()

const inputVal = useTemplateRef('inputVal')
const priority = useTemplateRef('priority')

const newTask = ref<string>('')
const newPriority = ref<boolean>(false)

const emit = defineEmits<{
  add: [item: string, priority: boolean]
}>()

function handleAdd() {
  if (props.items !== undefined) {
    if (inputVal.value?.getValue().trim() && priority.value != undefined) {
      newTask.value = inputVal.value.getValue()
      newPriority.value = priority.value?.getValue()
      emit('add', newTask.value, newPriority.value)
      inputVal.value.resetValue()
      priority.value.resetValue()
    }
  }
}

</script>

<template>
  <div class="form-container">
    <form id="list-form" class="add-list-form" @submit.prevent="handleAdd()">
      <TaskFormRow ref="inputVal" />
      <PriorityToggle ref="priority" />
      <BaseButton :type="'submit'">Crear</BaseButton>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
}

.toggle-group {
  display: flex;
  margin: auto 15px;
}
</style>
