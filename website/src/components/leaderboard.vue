<script setup lang="ts">
import * as lb from '@/lib/leaderboard';
import LeaderboardItem from './leaderboard-item.vue';
defineProps<{
    data: lb.Leaderboard
}>()
</script>

<template>
    <ol class="leaderboard">
        <LeaderboardItem v-for="item in data.data" :data="item"></LeaderboardItem>
    </ol>
</template>