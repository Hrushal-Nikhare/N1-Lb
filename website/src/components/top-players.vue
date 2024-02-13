<script setup lang="ts">
import { get_n } from '@/lib/db';
import { abbreviateNumber as abbr } from '@/lib/abbr';
import { STATS, type Stat, type Player } from '@/lib/leaderboard';

let data: {
    [key in Stat]: Player
} = Object.fromEntries(await Promise.all(Object.keys(STATS).map(async (x) => [x as Stat, (await get_n(x as Stat, 1))[0]])));
console.log(data);
</script>

<template>
    <div class="top-players">
        <div v-for="stat in Object.keys(STATS)">
            <h3>Top {{ STATS[stat as Stat] }}</h3>
            <b v-if="stat!=='kdratio'">{{ data[stat as Stat].username}}</b>
            <p v-if="stat!=='kdratio'">{{ abbr(data[stat as Stat].stats[stat as Stat] ?? 0) }}</p>
        </div>
    </div>
</template>