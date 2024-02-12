<script setup lang="ts">
import * as lb from '@/lib/leaderboard';
import LeaderboardItem from './leaderboard-item.vue';
defineProps<{
    data: lb.Leaderboard
}>()
</script>

<template>
    <ol class="leaderboard">
        <template v-for="chunk in data.chunks">
            <LeaderboardItem v-for="player in chunk.data" :data="player"></LeaderboardItem>
        </template>
    </ol>
</template>