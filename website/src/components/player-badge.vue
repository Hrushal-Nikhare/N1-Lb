<script setup lang="ts">
defineProps<{
    username: string
}>()
</script>

<template>
    <div class="player-badge">
        <p>
            {{ username }}
        </p>
    </div>
</template>