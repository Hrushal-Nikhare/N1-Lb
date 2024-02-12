<script setup lang="ts">
import * as lb from '@/lib/leaderboard';
import { abbreviateNumber as abbr } from '@/lib/abbr';
import PlayerBadge from './player-badge.vue';
defineProps<{
    data: lb.LeaderdoardItem
}>();
</script>

<template>
    <li>
        <PlayerBadge :data="data.player"></PlayerBadge>
        <b>{{ abbr(data.stat) }}</b>
    </li>
</template>