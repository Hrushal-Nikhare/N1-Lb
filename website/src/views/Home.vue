<script setup lang="ts">
import VueLeaderboard from '@/components/vue-leaderboard.vue';
import TitlePage from '@/components/title-page.vue';
import TopPlayers from '@/components/top-players.vue';
import LoadingWheel from '@/components/loading-wheel.vue';
</script>

<template>
    <TitlePage></TitlePage>
    <Suspense>
        <div>
            <TopPlayers></TopPlayers>
            <VueLeaderboard></VueLeaderboard>
        </div>
        <template #fallback>
            <LoadingWheel></LoadingWheel>
        </template>
        
    </Suspense>
</template>
