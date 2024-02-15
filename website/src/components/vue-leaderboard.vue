<script setup lang="ts">
import * as lb from '@/lib/leaderboard';
import LeaderboardItem from './leaderboard-item.vue';
import LeaderboardControls from './leaderboard-controls.vue';
import { ref, type LabelHTMLAttributes, type Ref } from 'vue';
import { get_n } from '@/lib/db';

const data: Ref<lb.Leaderboard> = ref({
    chunks: [],
    stat: "elo"
});
await reload_data();
const controls: Ref<lb.Controls> = ref(new lb.Controls());

function sortby(stat: lb.Stat) {
    data.value.stat = stat
    reload_data();
}
async function reload_data() {
    data.value = {
        chunks: [{
            data: await get_n(data.value.stat as lb.Stat, 50),
            min: 0,
            max: 0
        }],
        stat: data.value.stat
    }
}
</script>

<template>
    <div class="leaderboard-container">
        <LeaderboardControls v-model="controls"></LeaderboardControls>
        <table class="leaderboard">
            <thead><tr>
                <td></td>
                <template v-for="stat in Object.keys(lb.STATS)">
                    <th v-if="controls.shown_stats[stat as lb.Stat]" @click="sortby(stat as lb.Stat)">{{ lb.STATS[stat as lb.Stat] }}</th>
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