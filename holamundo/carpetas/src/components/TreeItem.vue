<script lang="ts" setup>
import { ref, computed } from 'vue'

console.log('cosa')

const props = defineProps({
  model: Object,
})

const isOpen = ref(false)
const isFolder = computed(() => {
  if (props.model == undefined) return null
  return props.model.children && props.model.children.length
})

function toggle() {
  isOpen.value = !isOpen.value
}

function changeType() {
  if (!isFolder.value && props.model != undefined) {
    props.model.children = []
    addChild()
    isOpen.value = true
  }
}

function addChild() {
  if (props.model != undefined) {
    props.model.children.push({ name: 'new stuff' })
  }
}

console.log(props.model)
</script>


<template>
  <li>
    <div
      :class="{ bold: isFolder }"
      @click="toggle"
      @dblclick="changeType">
      {{ model?.name }}
      <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <!--
        A component can recursively render itself using its
        "name" option (inferred from filename if using SFC)
      -->
      <TreeItem
        class="item"
        v-for="model in model?.children"
        :model="model"/>
      <li class="add" @click="addChild">+</li>
    </ul>
  </li>
</template>

<style scoped>

.item {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
</style>