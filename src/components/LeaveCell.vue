<template>
    <div style="position: relative;">
        <div style="height: 100%;" :class="{
            holiday: dayData?.isHoliday,
            weekendDay: dayData?.isWeekendDay,
            weighted: !dayData?.isWeekendDay && !dayData?.isHoliday
        }">
            {{ dayData?.getDayNumber() }}</div>
        <div v-if="dayData?.isBangerDay()" class="banger"></div>
        <div v-if="dayData?.isDoubleBangerDay()" class="double-banger"></div>
    </div>
</template>
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { DayData } from '../models/day-data.model';


const props = defineProps<
    { dayData: DayData | undefined }>();

const weightedColor = computed(() => {
    if (props.dayData == null) {
        return 'white';
    }
    return `hsl(190,90%,${props.dayData.getWeight() ? 95 - props.dayData.getWeight() * props.dayData.getWeight() * 2 : 100}%)`;
});

const color = computed(() => {
    if (props.dayData == null) {
        return '';
    }
    if (props.dayData.getWeight() > 5) {
        return 'white';
    }
})




</script>
<style>
.weighted {
    background-color: v-bind(weightedColor);
    color: v-bind(color);
}

.weekendDay {
    background-color: hsl(100, 67%, 63%);
}

.holiday {
    background-color: hsl(63, 80%, 70%)
}


.banger,
.double-banger {
    position: absolute;
    content: '';
    border-radius: 50%;
    height: 0.3em;
    width: 0.3em;
    top: 0.3em;
    background-color: coral;
}

.banger {
    left: 0.3em;
}

.double-banger {
    left: 0.7em;
}
</style>