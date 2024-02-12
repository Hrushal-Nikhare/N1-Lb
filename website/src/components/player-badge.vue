<script setup lang="ts">
defineProps<{
    username: string
}>()
</script>

<template>
    <th class="player-badge">{{ username }}</th>
</template>