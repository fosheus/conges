import { getHolidays } from "../api/holidays";
import { DayData } from "../models/day-data.model";
import { formattedDate } from "../utils/date.util";

export class LeaveService {
    private static readonly WEEK_LENGTH = 7;
    private holidays: any;
    private dayDataMap = new Map<string, DayData>();

    public async getDaysWeights(holidays: any, startDate: Date, endDate: Date): Promise<Map<string, DayData>> {

        this.dayDataMap.clear();
        this.holidays = holidays;

        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));



        // populate
        let i = 0;
        while (i <= diffDays) {
            const current = this.getDayOffset(startDate, i);
            const holiday = this.isHoliday(current);
            const weekend = this.isWeekEnd(current);
            const dayData = new DayData(current, holiday, weekend);
            this.dayDataMap.set(formattedDate(current), dayData);

            i++;
        }
        i = 0;
        while (i <= diffDays) {
            const current = this.getDayOffset(startDate, i);
            const dayData = this.dayDataMap.get(formattedDate(current));
            if (dayData == null || dayData.isWeekendDay) {
                i++;
                continue;
            }

            if (dayData.isHoliday && (this.isNextToWeekend(dayData.date) || this.isNextDayHoliday(dayData.date))) {
                this.radiateToDaysBeforeAndAfter(dayData.date, 4);
                i++;
                continue;
            }


            if (this.isNextToHoliday(dayData.date)) {
                dayData.isNextToHoliday = true;
            }
            if (this.isNextToWeekend(dayData.date)) {
                dayData.isNextToWeekEnd = true;
            }
            if (dayData.isBangerDay()) {
                this.radiateToWeekBeforeAndAfter(dayData.date);
            }
            i++;
        }

        return Promise.resolve(this.dayDataMap);
    }

    private getDayOffset(date: Date, offset: number) {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + offset);
        return nextDay;
    }

    private isHoliday(date: Date) {
        const holiday = this.holidays[formattedDate(date)];
        return !!holiday;
    }

    private isNextToHoliday(date: Date) {
        return (
            (this.isNextDayHoliday(date) && !this.isNextDayWeekendDay(date)) ||
            (this.isPreviousDayHoliday(date) && !this.isPreviousDayWeekendDay(date))
        );
    }

    private isNextDayHoliday(date: Date) {
        return this.isHoliday(this.getNextDay(date));
    }

    private isPreviousDayHoliday(date: Date) {
        return this.isHoliday(this.getPreviousDay(date));
    }

    private isWeekEnd(date: Date) {
        return date.getDay() === 0 || date.getDay() === 6;
    }

    private isNextToWeekend(date: Date) {
        return this.isNextDayWeekendDay(date) || this.isPreviousDayWeekendDay(date);
    }

    private isNextDayWeekendDay(date: Date) {
        return this.isWeekEnd(this.getNextDay(date));
    }

    private isPreviousDayWeekendDay(date: Date) {
        return this.isWeekEnd(this.getPreviousDay(date));
    }

    private getPreviousDay(date: Date, gap = 1) {
        const previous = new Date(date);
        previous.setDate(previous.getDate() - gap);
        return previous;
    }

    private getNextDay(date: Date, gap = 1) {
        const previous = new Date(date);
        previous.setDate(previous.getDate() + gap);
        return previous;
    }

    private radiateToWeekBeforeAndAfter(date: Date) {
        this.radiateToDaysBeforeAndAfter(date, LeaveService.WEEK_LENGTH);
    }
    private radiateToDaysBeforeAndAfter(date: Date, depth = 0) {
        this.radiateToDaysAfter(date, depth);
        this.radiateToDaysBefore(date, depth);
    }

    private radiateToDaysAfter(beamingDate: Date, depth: number) {
        if (depth === 0) {
            return;
        }
        const dayAfter = this.getNextDay(beamingDate, depth);
        const dayAfterData = this.dayDataMap.get(formattedDate(dayAfter));
        if (!dayAfterData) {
            return;
        }
        const formattedBeamingDate = formattedDate(beamingDate);
        if (!dayAfterData.isBeamedBy(formattedBeamingDate)) {
            dayAfterData.addBangerBeam(formattedBeamingDate)
            if (dayAfterData.isBangerDay()) {
                this.radiateToDaysBeforeAndAfter(dayAfter);
            }
        }
        this.radiateToDaysAfter(beamingDate, depth - 1);
    }

    private radiateToDaysBefore(beamingDate: Date, depth: number) {
        if (depth === 0) {
            return;
        }
        const dayBefore = this.getPreviousDay(beamingDate, depth);
        const dayBeforeData = this.dayDataMap.get(formattedDate(dayBefore));
        if (!dayBeforeData) {
            return;
        }
        const formattedBeamingDate = formattedDate(beamingDate);
        if (!dayBeforeData.isBeamedBy(formattedBeamingDate)) {
            dayBeforeData.addBangerBeam(formattedBeamingDate)
            if (dayBeforeData.isBangerDay()) {
                this.radiateToDaysBeforeAndAfter(dayBefore);
            }
        }
        this.radiateToDaysBefore(beamingDate, depth - 1);
    }
}
