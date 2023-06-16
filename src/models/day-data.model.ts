import { DayFlag } from "../enums/day-flag.enum";
import { booleanToNumber } from "../utils/typeUtil";

export class DayData {
    private static letters = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];
    isNextToWeekEnd: boolean = false;
    isNextToHoliday: boolean = false;
    private bangerBeam: string[] = [];

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
            this.bangerBeam.length * DayFlag.BANGER_BEAMED
        );
    }

    public isBangerDay() {
        return this.getWeight() > 4 && !this.isHoliday && !this.isWeekendDay;
    }
    public isDoubleBangerDay() {
        return this.getWeight() >= 6;
    }

    public addBangerBeam(dateFormatted: string) {
        if (this.bangerBeam.indexOf(dateFormatted) === -1) {
            this.bangerBeam.push(dateFormatted);
        }
    }

    public isBeamedBy(dateFormatted: string) {
        return this.bangerBeam.indexOf(dateFormatted) !== -1;
    }
}
