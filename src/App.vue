<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useLeaveStore } from './store/leaveStore';
import { DayData } from './models/day-data.model';
import LeaveCalendar from './components/LeaveCalendar.vue';

const leaveStore = useLeaveStore();
leaveStore.calculate();
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

function computedStyle(dayData: DayData) {
  let style = {
    backgroundColor: `white`
  }
  style.backgroundColor = `hsl(190,90%,${dayData.getWeight() ? 95 - dayData.getWeight() * dayData.getWeight() * 2 : 100}%)`;

  if (dayData.isHoliday) {
    style.backgroundColor = 'hsl(63,80%,70%)';
  }
  if (dayData.isWeekendDay) {
    style.backgroundColor = 'hsl(100,67%,63%)';
  }
  return style;

}
</script>

<template>
  <div class="actions"> <button @click="monthIndex--">-</button>
    <div style=" width : 200px;padding : 0 5px">{{ months[month] }} / {{ year }}</div>
    <button @click="monthIndex++">+</button>
  </div>

  <div style="display: flex; gap:3rem">
    <LeaveCalendar :month="previousCalendarMonth" :year="previousCalendarYear" :current="false" place="left" />
    <LeaveCalendar :month="month" :year="year" :current="true" />
    <LeaveCalendar :month="nextCalendarMonth" :year="nextCalendarYear" :current="false" place="right" />
  </div>
  <input type="button" value="Recharger">
  Calcul sur 5 ans glissant
  <div v-for="[key, value] in days">
    <div style="display:flex"> <span style="min-width: 2rem">{{ value.getDayLetter() }}</span> <span
        :style="computedStyle(value)"> {{ key }} {{ value.getWeight() }}</span></div>
  </div>
</template>

<style scoped></style>
