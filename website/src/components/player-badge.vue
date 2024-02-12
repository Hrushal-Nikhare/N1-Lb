<script setup lang="ts">
import type { Player } from '@/lib/leaderboard'
defineProps<{
    data: Player
}>()
</script>

<template>
    <div class="player-badge">
        <img :src="data.icon" v-if="data.icon">
        <p>
            {{ data.username }}
        </p>
    </div>
</template>