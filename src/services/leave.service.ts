import { getHolidays } from "../api/holidays";
import { DayData } from "../models/day-data.model";
import { formattedDate } from "../utils/date.util";

export class LeaveService {
  private static YEARS = 5;
  private holidays: any;
  private dayDataMap = new Map<string, DayData>();

  public async getDaysWeights(): Promise<Map<string, DayData>> {
    this.holidays = await getHolidays();
    this.dayDataMap.clear();

    const today = new Date();
    const endDay = new Date(today);
    endDay.setFullYear(endDay.getFullYear() + 2);
    // populate
    let i = 0;
    while (i < 365 * LeaveService.YEARS) {
      const current = this.getDayOffset(today, i);
      const holiday = this.isHoliday(current);
      const weekend = this.isWeekEnd(current);
      const dayData = new DayData(current, holiday, weekend);
      this.dayDataMap.set(formattedDate(current), dayData);

      i++;
    }
    i = 0;
    while (i < 365 * LeaveService.YEARS) {
      const current = this.getDayOffset(today, i);
      const dayData = this.dayDataMap.get(formattedDate(current));
      if (dayData == null || dayData.isHoliday || dayData.isWeekendDay) {
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

  private getPreviousDay(date: Date) {
    const previous = new Date(date);
    previous.setDate(previous.getDate() - 1);
    return previous;
  }

  private getNextDay(date: Date) {
    const previous = new Date(date);
    previous.setDate(previous.getDate() + 1);
    return previous;
  }
  private radiateToWeekBeforeAndAfter(date: Date) {
    this.radiateToWeekAfter(date);
    this.radiateToWeekBefore(date);
  }

  private radiateToWeekAfter(date: Date, depth = 0) {
    if (depth === 7) {
      return;
    }
    const dayAfter = this.getNextDay(date);
    const dayAfterData = this.dayDataMap.get(formattedDate(dayAfter));
    if (!dayAfterData) {
      return;
    }
    if (!dayAfterData.isBangerBeamed) {
      dayAfterData.isBangerBeamed = true;
      if (dayAfterData.isBangerDay()) {
        this.radiateToWeekBeforeAndAfter(dayAfter);
      }
    }
    this.radiateToWeekAfter(dayAfter, depth + 1);
  }

  private radiateToWeekBefore(date: Date, depth = 0) {
    if (depth === 7) {
      return;
    }
    const dayBefore = this.getPreviousDay(date);
    const dayBeforeData = this.dayDataMap.get(formattedDate(dayBefore));
    if (!dayBeforeData) {
      return;
    }
    if (!dayBeforeData.isBangerBeamed) {
      dayBeforeData.isBangerBeamed = true;
      if (dayBeforeData.isBangerDay()) {
        this.radiateToWeekBeforeAndAfter(dayBefore);
      }
    }
    this.radiateToWeekBefore(dayBefore, depth + 1);
  }
}
