<template>
<Calendar class="blured" :month="previousMonth" :year="previousYear" :current="false"/>
<Calendar :month="currentMonth" :year="currentYear"/>
<Calendar class="blured" :month="nextMonth" :year="nextYear" :current="false"/>
</template>
<script setup lang="ts">
import { LocalDateTime } from '../models/local-date-time';
import Calendar from './Calendar.vue';

const initialDate = new Date();
const localDateTime = LocalDateTime.fromDate(initialDate);


</script>