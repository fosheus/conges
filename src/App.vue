<script setup lang="ts">
import LeaveCalendarWrapper from "../src/components/LeaveCalendarWrapper.vue"
</script>

<template>
    <main class="background">
        <Suspense>
            <LeaveCalendarWrapper></LeaveCalendarWrapper>
            <template #fallback>
                Loading...
            </template>
        </Suspense>
    </main>
</template>

<style scoped>
.background {
    display: flex;
    justify-content: center;
    align-items: center;

}
</style>

