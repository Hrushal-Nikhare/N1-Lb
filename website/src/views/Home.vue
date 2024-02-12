<script setup lang="ts">
import VueLeaderboard from '@/components/vue-leaderboard.vue';
import TitlePage from '@/components/title-page.vue';
import { Stat, type Leaderboard } from '@/lib/leaderboard';
import { ref, type Ref } from 'vue';
import { get_with_range, get_n } from '@/lib/db';
const data: Ref<undefined|Leaderboard> = ref(undefined);
(async function() {
    data.value = {
        chunks: [await get_n(Stat.elo, 10)],
        stat: Stat.elo
    };
})()
</script>

<template>
    <TitlePage></TitlePage>
    <VueLeaderboard :data="data" v-if="data"></VueLeaderboard>
</template>
