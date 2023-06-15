<script setup lang="ts">
import LeaveCalendarWrapper from "../src/components/LeaveCalendarWrapper.vue"
</script>

<template>
  <Suspense>
    <LeaveCalendarWrapper></LeaveCalendarWrapper>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

