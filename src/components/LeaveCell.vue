<template>
    <div style="position: relative;">
        <div style="height: 100%;" :class="{
            holiday: dayData?.isHoliday,
            weekendDay: dayData?.isWeekendDay,
            weighted: !dayData?.isWeekendDay && !dayData?.isHoliday
        }">
            {{ dayData?.getDayNumber() }}</div>
        <div v-if="dayData?.isBangerDay()" class="banger"></div>
    </div>
</template>
<script setup lang="ts">
import { DayData } from '../models/day-data.model';
import { ref, watch } from 'vue';


const props = defineProps<
    { dayData: DayData | undefined }>();

const weightedColor = ref('white');

watch(() => props.dayData, (value) => {
    if (value == null) {
        return
    }
    weightedColor.value = `hsl(190,90%,${value.getWeight() ? 95 - value.getWeight() * value.getWeight() * 2 : 100}%)`
});

</script>
<style>
.weighted {
    background-color: v-bind(weightedColor);
}

.weekendDay {
    background-color: hsl(100, 67%, 63%);
}

.holiday {
    background-color: hsl(63, 80%, 70%)
}


.banger {
    position: absolute;
    content: '';
    border-radius: 50%;
    height: 5px;
    width: 5px;
    top: 5px;
    left: 5px;
    background-color: coral;
}
</style>