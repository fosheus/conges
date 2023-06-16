<template>
    <div class="grid-container">
        <div v-for="dayLabel in daysOfWeek" class="header">{{ dayLabel
        }}</div>
        <LeaveCell v-for="day in daysOfPreviousMonth" class="cell previous" :day-data="day" />
        <LeaveCell v-for="day in days" class="cell" :day-data="day" />
        <LeaveCell v-for="day in daysOfNextMonth" class="cell next" :day-data="day" />
    </div>
</template>
<script setup lang="ts">

import { ref, watch } from 'vue';
import { useLeaveStore } from '../store/leave.store';
import { DayData } from '../models/day-data.model';
import LeaveCell from './LeaveCell.vue'
import { useDaysOfWeek } from '../composables/days-of-week';

const props = defineProps<{
    month: number,
    year: number,
}>();

const leaveStore = useLeaveStore();

if (props.month < 0 || props.month > 12) {
    throw new Error("month must be between 0 and 12 ")
}
const { daysOfWeek } = useDaysOfWeek();

const daysOfPreviousMonth = ref<DayData[]>([]);
const days = ref<DayData[]>([]);
const daysOfNextMonth = ref<DayData[]>([]);

watch(() => [props.year, props.month], ([newYear, newMonth]) => {
    console.log(newYear, newMonth);
    daysOfNextMonth.value = [];
    days.value = [];
    daysOfPreviousMonth.value = [];
    reset(newYear, newMonth);
});
reset(props.year, props.month);





function reset(year: number, month: number) {
    let i = 0;
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    if (firstDayOfMonth === 0) {
        firstDayOfMonth = 7;
    }

    while (i < firstDayOfMonth - 1) {
        const day = new Date(year, month, -i);
        const dayDataToAdd = leaveStore.getDayOfMonth(day.getDate(), day.getMonth(), day.getFullYear());
        daysOfPreviousMonth.value = [dayDataToAdd, ...daysOfPreviousMonth.value];
        i++;
    }
    i = 1;
    const lastDateOfMonth = new Date(year, month + 1, 0);
    while (lastDateOfMonth.getDate() >= i) {
        const dayDataToAdd = leaveStore.getDayOfMonth(i++, month, year);
        days.value.push(dayDataToAdd);
    }

    const numberOfDays = days.value.length + daysOfPreviousMonth.value.length;
    i = 1;
    while (numberOfDays + daysOfNextMonth.value.length < 42) {
        const day = new Date(year, month + 1, i++);
        const dayDataToAdd = leaveStore.getDayOfMonth(day.getDate(), day.getMonth(), day.getFullYear());
        daysOfNextMonth.value.push(dayDataToAdd);
    }
}

</script>
<style>
.grid-container {
    display: grid;
    grid-template: repeat(6, 1.25em) / repeat(7, 3em);
}

.cell {
    text-align: center;
    width: 100%;
}

.cell:hover {
    transition: scale 0.25s;
    scale: 1.2;
    box-shadow: 0 0 2px;
    z-index: 9000;
}

.header {
    text-align: center;
    font-size: 0.75em;
    font-weight: bolder;
}

.next,
.previous {
    color: grey
}

@media only screen and (max-width: 1200px) {
    .grid-container {
        display: grid;
        grid-template: repeat(6, 1em) / repeat(7, 2.5em);
    }

}
</style>