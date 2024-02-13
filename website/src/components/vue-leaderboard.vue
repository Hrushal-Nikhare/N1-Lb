<script setup lang="ts">
import * as lb from '@/lib/leaderboard';
import LeaderboardItem from './leaderboard-item.vue';
import LeaderboardControls from './leaderboard-controls.vue';
import { ref, type Ref } from 'vue';
defineProps<{
    data: lb.Leaderboard
}>()
const controls: Ref<lb.Controls> = ref(new lb.Controls());
</script>

<template>
    <div class="leaderboard-container">
        <LeaderboardControls v-model="controls"></LeaderboardControls>
        <table class="leaderboard">
            <thead>
                <td></td>
                <template v-for="key in Object.keys(lb.STATS)">
                    <th v-if="controls.shown_stats[key as lb.Stat]">{{ lb.STATS[key as lb.Stat] }}</th>
                </template>
            </thead>
            <tbody>
                <template v-for="chunk in data.chunks">
                    <LeaderboardItem v-for="player in chunk.data" :data="player" :controls="controls"></LeaderboardItem>
                </template>
            </tbody>
        </table>
    </div>
</template>