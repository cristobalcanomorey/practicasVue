<script lang="ts" setup>
import ItemRow from '@/components/molecules/ItemRow.vue';
import {ref} from 'vue'

const items = defineModel<string[]>('list')

</script>

<template>
	<TransitionGroup tag="ul" name="fade" class="container">
		<ItemRow v-for="item in items" :item="item" :key="item" />
	</TransitionGroup>
</template>

<style scoped>
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>