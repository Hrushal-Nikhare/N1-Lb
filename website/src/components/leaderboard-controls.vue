<script setup lang="ts">
import { type Ref } from 'vue';
import { type Controls, STATS, type Stat } from '@/lib/leaderboard';
const model: Ref<Controls|undefined> = defineModel();
</script>

<template>
    <div>
        <label v-for="stat in Object.keys(STATS)">
            {{ STATS[stat as Stat] }}
            <input type="checkbox" v-model="model!.shown_stats[stat as Stat]">
        </label>
    </div>
</template>