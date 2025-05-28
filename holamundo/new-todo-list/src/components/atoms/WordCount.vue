<script lang="ts" setup>
import {computed} from 'vue'

const text = defineModel<string>('value')
const max = defineModel<number>('max')

const count = computed(() => text.value?.length)
</script>

<template>
	{{ count }} / {{ max }}
</template>