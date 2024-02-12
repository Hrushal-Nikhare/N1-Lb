<script setup lang="ts">
import Leaderboard from '@/components/leaderboard.vue';
import TitlePage from '@/components/title-page.vue';
import { Stat } from '@/lib/leaderboard';
const data = {
    stat: Stat.elo,
    data: Array(100).fill(
        {
            player: {username: "Lege19", icon: "./favicon.svg"},
            stat: 100000
        }
    )
};
</script>

<template>
    <TitlePage></TitlePage>
    <Leaderboard :data="data"></Leaderboard>
</template>
