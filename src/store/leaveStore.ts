import { defineStore } from "pinia";
import { ref } from "vue";
import { DayData } from "../models/day-data.model";
import { getDaysWeights } from "../services/leave.service";

export const useLeaveStore = defineStore("leave", () => {
  const days = ref(new Map<string, DayData>());

  async function calculate() {
    days.value = await getDaysWeights();
  }

  return {
    days,
    calculate,
  };
});
