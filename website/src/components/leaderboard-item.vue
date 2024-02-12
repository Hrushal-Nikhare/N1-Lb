<script setup lang="ts">
import * as lb from '@/lib/leaderboard';
import { abbreviateNumber as abbr } from '@/lib/abbr';
import PlayerBadge from './player-badge.vue';
defineProps<{
    data: lb.Player
}>();
</script>

<template>
    <li>
        <PlayerBadge :username="data.username"></PlayerBadge>
        <b v-for="stat in lb.Stat">{{ abbr(data.stats[stat] ?? 0) }}</b>
    </li>
</template>