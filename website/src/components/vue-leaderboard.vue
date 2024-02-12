<script setup lang="ts">
import * as lb from '@/lib/leaderboard';
import LeaderboardItem from './leaderboard-item.vue';
defineProps<{
    data: lb.Leaderboard
}>()
</script>

<template>
    <table class="leaderboard">
        <thead>
            <td></td>
            <th>Deaths</th>
            <th>Elo</th>
            <th>Captures</th>
            <th>Games Played</th>
            <th>Wins</th>
            <th>Kills</th>
            <th>Points</th>
            <th>kdr</th>
        </thead>
        <tbody>
            <template v-for="chunk in data.chunks">
                <LeaderboardItem v-for="player in chunk.data" :data="player"></LeaderboardItem>
            </template>
        </tbody>
    </table>
</template>