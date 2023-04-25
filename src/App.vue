<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useLeaveStore } from './store/leaveStore';
import {formattedDate } from './utils/date.util';
import { DayData } from './models/day-data.model';

  const leaveStore = useLeaveStore();
  leaveStore.calculate();
  const {days} = storeToRefs(leaveStore);

  function computedStyle(dayData : DayData) {
    let style = {
      backgroundColor:`hsl(10,75%,${dayData.getWeight() ? 85-dayData.getWeight()*dayData.getWeight():100}%)`
    }
    if (dayData.isHoliday ) {
      style.backgroundColor= 'hsl(63,80%,63%)';
    } 
    if (dayData.isWeekendDay) {
      style.backgroundColor='hsl(100,67%,63%)';
    }
    return style;
    
  }
</script>

<template>
  <input type="button" value="Recharger">
  Calcul sur 5 ans glissant

  <div v-for="[key,value] in days">
 <div style="display:flex" > <span style="min-width: 2rem">{{ value.getDayLetter() }}</span> <span :style="computedStyle(value) "> {{ key }} {{ value.getWeight() }}</span></div>
  </div>
</template>

<style scoped>
.banger {
  background-color: cornflowerblue;
}
.doubleBanger {
  background-color: coral;
}
</style>
