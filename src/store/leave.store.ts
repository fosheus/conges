import { defineStore } from "pinia";
import { ref } from "vue";
import { DayData } from "../models/day-data.model";
import { LeaveService } from "../services/leave.service";
import { getHolidays } from "../api/holidays";

function padStart02Digits(number: number) {
    return number.toString().padStart(2, "0");
}

const YEARS = 15;

export const useLeaveStore = defineStore("leave", () => {
    const days = ref(new Map<string, DayData>());
    const leaveService = new LeaveService();
    const start = ref(new Date());
    start.value.setFullYear(start.value.getFullYear() - 10);
    start.value.setDate(1);
    start.value.setMonth(0);
    const end = ref(new Date(start.value.getTime()));
    end.value.setFullYear(start.value.getFullYear() + YEARS);
    end.value.setDate(31);
    end.value.setMonth(11);

    async function calculate() {
        const holidays = await getHolidays();

        days.value = await leaveService.getDaysWeights(holidays, start.value, end.value);
    }

    function getDayOfMonth(day: number, monthIndex: number, year: number) {
        return days.value.get(
            `${year}-${padStart02Digits(monthIndex + 1)}-${padStart02Digits(day)}`
        )!;
    }

    return {
        days,
        startDate: start,
        endDate: end,
        getDayOfMonth,
        calculate,
    };
});
