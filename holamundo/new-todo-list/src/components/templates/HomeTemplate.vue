<script lang="ts" setup>
import HeaderOrg from "../organisms/HeaderOrg.vue";
import HomeMain from "../organisms/HomeMain.vue";
import {ref} from 'vue'
import { useRoute } from 'vue-router'

const $route = useRoute()

const lang = ref<string | string[]>($route.params.lang)


</script>

<template>
	<HeaderOrg />
	<HomeMain />
</template>
