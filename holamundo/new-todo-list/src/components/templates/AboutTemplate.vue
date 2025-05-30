<script lang="ts" setup>
import HeaderOrg from "../organisms/HeaderOrg.vue";
import AboutMain from "@/components/organisms/AboutMain.vue";
import type { Idioma } from "@/types";
import {ref} from 'vue'
import { useRoute } from 'vue-router'

const $route = useRoute()

const lang = ref<string | string[]>($route.params.lang)


</script>

<template>
	<HeaderOrg />
	<AboutMain />
</template>
