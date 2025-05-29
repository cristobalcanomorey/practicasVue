<script lang="ts" setup>
const props = defineProps<{
	type: "button" | "submit" | "reset" | undefined
}>()
</script>

<template>
	<button :type="type" class="button-default">
		<slot>Default</slot>
	</button>
</template>

<style scoped>
/* CSS */
.button-default {
	align-items: center;
	background-color: #FFFFFF;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: .25rem;
	box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
	box-sizing: border-box;
	color: rgba(0, 0, 0, 0.85);
	cursor: pointer;
	display: inline-flex;
	font-family: system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 16px;
	font-weight: 600;
	justify-content: center;
	line-height: 1.25;
	margin: 0;
	min-height: 3rem;
	padding: calc(.875rem - 1px) calc(1.5rem - 1px);
	position: relative;
	text-decoration: none;
	transition: all 250ms;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	vertical-align: baseline;
	width: auto;
	margin: auto;
}

.remove{
	/* border: 2px solid rgba(250, 112, 112, 0.336); */
	/* color: white; */
	font-weight: bold;
	margin-right: 0;
	border-radius: 100px;
	width: 10px;
	height: 10px;
	/* padding: 5px; */
}

.button-default:hover,
.button-default:focus {
	border-color: rgba(0, 0, 0, 0.15);
	box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
	color: rgba(0, 0, 0, 0.65);
}

.remove:hover,
.remove:focus{
	border-color: rgba(255, 85, 85, 0.89);
	box-shadow: rgba(255, 85, 85, 0.06) 0 2px 4px;
}

.button-default:hover {
	transform: translateY(-1px);
}

.button-default:active {
	background-color: #F0F0F1;
	border-color: rgba(0, 0, 0, 0.15);
	box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
	color: rgba(0, 0, 0, 0.65);
	transform: translateY(0);
}
</style>