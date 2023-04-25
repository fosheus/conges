export enum DayEnum {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 0,
}
const frToDayEnum: any = {
  lundi: DayEnum.MONDAY,
  mardi: DayEnum.TUESDAY,
  mercredi: DayEnum.WEDNESDAY,
  jeudi: DayEnum.THURSDAY,
  vendredi: DayEnum.FRIDAY,
  samedi: DayEnum.SATURDAY,
  dimanche: DayEnum.SUNDAY,
};

export class LocalDateTime {
  year: number = 0;
  month: number = 0;
  date: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  day: DayEnum = DayEnum.SUNDAY;

  public static fromDate(date: Date): LocalDateTime {
    const ldc = new LocalDateTime();
    ldc.initLocalDate(date);
    ldc.initLocalTime(date);
    return ldc;
  }

  private initLocalDate(date: Date) {
    if (!date) {
      return;
    }
    const stringRepresentation = date.toLocaleDateString("fr-FR");
    const dateTokens = stringRepresentation.split("/");
    this.year = Number.parseInt(dateTokens[0]);
    this.month = Number.parseInt(dateTokens[1]);
    this.date = Number.parseInt(dateTokens[2]);
    this.day =
      frToDayEnum[date.toLocaleDateString("fr-FR", { weekday: "long" })];
  }

  private initLocalTime(date: Date) {
    if (!date) {
      return;
    }
    const stringRepresentation = date.toLocaleDateString("fr-FR");
    const dateTokens = stringRepresentation.split(":");
    this.hours = Number.parseInt(dateTokens[0]);
    this.minutes = Number.parseInt(dateTokens[1]);
    this.seconds = Number.parseInt(dateTokens[2]);
  }
}
