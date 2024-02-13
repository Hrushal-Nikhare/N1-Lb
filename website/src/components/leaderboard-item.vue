<script setup lang="ts">
import * as lb from '@/lib/leaderboard';
import { abbreviateNumber as abbr } from '@/lib/abbr';
import PlayerBadge from './player-badge.vue';
defineProps<{
    data: lb.Player,
    controls?: lb.Controls
}>();
</script>

<template>
    <tr>
        <PlayerBadge :username="data.username"></PlayerBadge>
        <template v-for="stat in Object.keys(lb.STATS)">
            <td v-if="!controls || controls?.shown_stats[stat as lb.Stat]">{{ abbr(data.stats[stat as lb.Stat] ?? 0) }}</td>
        </template>
    </tr>
</template>