<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useLeaveStore } from '../store/leaveStore';
import LeaveCalendar from './LeaveCalendar.vue';
import Legend from './Legend.vue';

const leaveStore = useLeaveStore();
await leaveStore.calculate();
const { days } = storeToRefs(leaveStore);
const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
const monthIndex = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const month = computed(() => new Date(currentYear.value, monthIndex.value).getMonth())
const year = computed(() => new Date(currentYear.value, monthIndex.value).getFullYear())

const previousCalendarMonth = computed(() => month.value === 0 ? 11 : month.value - 1);
const nextCalendarMonth = computed(() => month.value === 11 ? 0 : month.value + 1);

const previousCalendarYear = computed(() => month.value === 0 ? year.value - 1 : year.value);
const nextCalendarYear = computed(() => month.value === 11 ? year.value + 1 : year.value);

</script>

<template>
    <div class="actions">
        <input @click="monthIndex--" value="<" type="button">
        <div class="month-and-year">{{ months[month] }} / {{ year }}</div>
        <input @click="monthIndex++" value=">" type="button">
    </div>

    <div class="calendars-wrapper">
        <LeaveCalendar :month="previousCalendarMonth" :year="previousCalendarYear" class="periph-calendar" />
        <LeaveCalendar :month="month" :year="year" class="central-calendar" />
        <LeaveCalendar :month="nextCalendarMonth" :year="nextCalendarYear" class="periph-calendar" />
    </div>

    <Legend></Legend>
</template>

<style scoped>
.actions {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.actions>input {
    all: unset;
    padding: 5px 16px;
    border: 2px solid hsl(200, 50%, 40%);
    border-radius: 5px;
    background-color: hsl(200, 50%, 60%);
}

.month-and-year {
    width: 200px;
    padding: 0 5px;
    text-align: center;
}

.calendars-wrapper {
    display: flex;
    justify-content: space-evenly;
}

.central-calendar {
    scale: 1.1
}

.periph-calendar {
    color: grey;
    scale: 0.95
}

@media only screen and (max-width: 800px) {
    .calendars-wrapper {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
}
</style>
