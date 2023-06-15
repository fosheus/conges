import { defineStore } from "pinia";
import { ref } from "vue";
import { DayData } from "../models/day-data.model";
import { getDaysWeights } from "../services/leave.service";

function padStart02Digits(number: number) {
  return number.toString().padStart(2, "0");
}

export const useLeaveStore = defineStore("leave", () => {
  const days = ref(new Map<string, DayData>());

  async function calculate() {
    days.value = await getDaysWeights();
  }

  function getDayOfMonth(day: number, monthIndex: number, year: number) {
    return days.value.get(
      `${year}-${padStart02Digits(monthIndex + 1)}-${padStart02Digits(day)}`
    )!;
  }

  return {
    days,
    getDayOfMonth,
    calculate,
  };
});
