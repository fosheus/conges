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

const weightedColor = computed((() => {
    if (props.dayData == null) {
        return 'white';
    }
    return `hsl(190,90%,${props.dayData.getWeight() ? 95 - props.dayData.getWeight() * props.dayData.getWeight() * 2 : 100}%)`;
}));





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


.banger,
.double-banger {
    position: absolute;
    content: '';
    border-radius: 50%;
    height: 5px;
    width: 5px;
    top: 5px;
    background-color: coral;
}

.banger {
    left: 5px;
}

.double-banger {
    left: 11px;
}
</style>