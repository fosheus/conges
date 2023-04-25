import { getHolidays } from "../api/holidays";
import { DayData } from "../models/day-data.model";
import { formattedDate } from "../utils/date.util";

const holidays = await getHolidays();
const dayDataMap = new Map<string, DayData>();

const YEARS = 5;

export async function getDaysWeights(): Promise<Map<string, DayData>> {
  const today = new Date();
  const endDay = new Date(today);
  endDay.setFullYear(endDay.getFullYear() + 2);
  dayDataMap.clear();
  // populate
  let i = 0;
  while (i < 365 * YEARS) {
    const current = getDayOffset(today, i);
    const holiday = isHoliday(current);
    const weekend = isWeekEnd(current);
    const dayData = new DayData(current, holiday, weekend);
    dayDataMap.set(formattedDate(current), dayData);

    i++;
  }
  i = 0;
  while (i < 365 * YEARS) {
    const current = getDayOffset(today, i);
    const dayData = dayDataMap.get(formattedDate(current));
    if (dayData == null || dayData.isHoliday || dayData.isWeekendDay) {
      i++;
      continue;
    }
    if (isNextToHoliday(dayData.date)) {
      dayData.isNextToHoliday = true;
    }
    if (isNextToWeekend(dayData.date)) {
      dayData.isNextToWeekEnd = true;
    }
    if (dayData.isBangerDay()) {
      radiateToWeekBeforeAndAfter(dayData.date);
    }
    i++;
  }

  return Promise.resolve(dayDataMap);
}

function getDayOffset(date: Date, offset: number) {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + offset);
  return nextDay;
}

function isHoliday(date: Date) {
  const holiday = holidays[formattedDate(date)];
  return !!holiday;
}

function isNextToHoliday(date: Date) {
  return isNextDayHoliday(date) || isPreviousDayHoliday(date);
}

function isNextDayHoliday(date: Date) {
  return isHoliday(getNextDay(date));
}

function isPreviousDayHoliday(date: Date) {
  return isHoliday(getPreviousDay(date));
}

function isWeekEnd(date: Date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

function isNextToWeekend(date: Date) {
  return isNextDayWeekendDay(date) || isPreviousDayWeekendDay(date);
}

function isNextDayWeekendDay(date: Date) {
  return isWeekEnd(getNextDay(date));
}

function isPreviousDayWeekendDay(date: Date) {
  return isWeekEnd(getPreviousDay(date));
}

function getPreviousDay(date: Date) {
  const previous = new Date(date);
  previous.setDate(previous.getDate() - 1);
  return previous;
}

function getNextDay(date: Date) {
  const previous = new Date(date);
  previous.setDate(previous.getDate() + 1);
  return previous;
}
function radiateToWeekBeforeAndAfter(date: Date) {
  radiateToWeekAfter(date);
  radiateToWeekBefore(date);
}

function radiateToWeekAfter(date: Date, depth = 0) {
  if (depth === 7) {
    return;
  }
  const dayAfter = getNextDay(date);
  const dayAfterData = dayDataMap.get(formattedDate(dayAfter));
  if (!dayAfterData) {
    return;
  }
  if (!dayAfterData.isBangerBeamed) {
    dayAfterData.isBangerBeamed = true;
    if (dayAfterData.isBangerDay()) {
      radiateToWeekBeforeAndAfter(dayAfter);
    }
  }
  radiateToWeekAfter(dayAfter, depth + 1);
}

function radiateToWeekBefore(date: Date, depth = 0) {
  if (depth === 7) {
    return;
  }
  const dayBefore = getPreviousDay(date);
  const dayBeforeData = dayDataMap.get(formattedDate(dayBefore));
  if (!dayBeforeData) {
    return;
  }
  if (!dayBeforeData.isBangerBeamed) {
    dayBeforeData.isBangerBeamed = true;
    if (dayBeforeData.isBangerDay()) {
      radiateToWeekBeforeAndAfter(dayBefore);
    }
  }
  radiateToWeekBefore(dayBefore, depth + 1);
}
