<script setup lang="ts">
import * as lb from '@/lib/leaderboard';
import LeaderboardItem from './leaderboard-item.vue';
import LeaderboardControls from './leaderboard-controls.vue';
import { ref, type Ref } from 'vue';
import { get_n } from '@/lib/db';

const data = ref({
    chunks: [{
        data: await get_n("elo", 10), 
        min:0, 
        max:0
    }],
    stat: "elo"
});
const controls: Ref<lb.Controls> = ref(new lb.Controls());
</script>

<template>
    <div class="leaderboard-container">
        <LeaderboardControls v-model="controls"></LeaderboardControls>
        <table class="leaderboard">
            <thead><tr>
                <td></td>
                <template v-for="key in Object.keys(lb.STATS)">
                    <th v-if="controls.shown_stats[key as lb.Stat]">{{ lb.STATS[key as lb.Stat] }}</th>
                </template>
            </tr></thead>
            <tbody>
                <template v-for="chunk in data.chunks">
                    <LeaderboardItem v-for="player in chunk.data" :data="player" :controls="controls"></LeaderboardItem>
                </template>
            </tbody>
        </table>
    </div>
</template>