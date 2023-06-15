import { DayFlag } from "../enums/day-flag.enum";
import { booleanToNumber } from "../utils/typeUtil";

export class DayData {
  private static letters = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];
  isNextToWeekEnd: boolean = false;
  isNextToHoliday: boolean = false;
  isBangerBeamed: boolean = false;

  date: Date;
  isHoliday: boolean;
  isWeekendDay: boolean;
  constructor(date: Date, isHoliday: boolean, isWeekendDay: boolean) {
    this.date = date;
    this.isHoliday = isHoliday;
    this.isWeekendDay = isWeekendDay;
  }

  public getDayLetter() {
    return DayData.letters[this.date.getDay()];
  }

  public getDayNumber() {
    return this.date.getDate();
  }

  public getWeight() {
    return (
      booleanToNumber(this.isNextToWeekEnd) * DayFlag.NEXT_WEEKEND +
      booleanToNumber(this.isNextToHoliday) * DayFlag.NEXT_HOLIDAY +
      booleanToNumber(this.isBangerBeamed) * DayFlag.BANGER_BEAMED
    );
  }

  public isBangerDay() {
    return this.getWeight() > 4;
  }
  public isDoubleBangerDay() {
    return this.getWeight() == 6;
  }
}
