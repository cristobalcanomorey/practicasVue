<script setup lang="ts">
import { computed } from 'vue'
import TodoListGroup from '@/components/TodoListGroup.vue'
import TodoToggleCompletos from '@/components/TodoToggleCompletos.vue'
import TodoListForm from '@/components/TodoListForm.vue'

import { ref } from 'vue'
import type { TodoListType } from '@/types/todo'

// Obtiene la lista de listas TODO
const $group = ref<InstanceType<typeof TodoListGroup> | null>(null)

const hideCompleted = ref<boolean>(false)

function toggleCompletados() {
  hideCompleted.value = !hideCompleted.value
}

// Comprueba si hay alguna tarea completada en alguna de las listas
const hasCompleted = computed(() => {
  if (!$group.value) return false
  return $group.value.listas.some((list: TodoListType) => list.todos.some((todo) => todo.done))
})

// Comprueba si se están ocultando las tareas completadas
const hasHidden = computed(() => {
  return hideCompleted.value
})

const newList = ref<string | null>(null)

// Crea una nueva lista de tareas
function handleAddList(listName: string) {
  newList.value = listName
  if ($group.value) {
    $group.value.listas.push({
      name: newList.value,
      todos: [],
    })
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <h1>Lista de tareas</h1>
      <TodoToggleCompletos
        :hayCompletados="hasCompleted"
        :hayOcultos="hasHidden"
        @toggle-completados="toggleCompletados()"
      />
      <TodoListForm @add="(listName) => handleAddList(listName)" />
    </div>
  </header>

  <main>
    <TodoListGroup ref="$group" :hideCompleted="hideCompleted" :newList="newList" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
