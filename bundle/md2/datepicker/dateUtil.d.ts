export declare class Md2DateUtil {
    getFirstDateOfMonth(date: Date): Date;
    getNumberOfDaysInMonth(date: Date): number;
    getDateInNextMonth(date: Date): Date;
    getDateInPreviousMonth(date: Date): Date;
    isSameMonthAndYear(d1: Date, d2: Date): boolean;
    isSameDay(d1: Date, d2: Date): boolean;
    isInNextMonth(startDate: Date, endDate: Date): boolean;
    isInPreviousMonth(startDate: Date, endDate: Date): boolean;
    getDateMidpoint(d1: Date, d2: Date): Date;
    getWeekOfMonth(date: Date): number;
    incrementMinutes(date: Date, numberOfMinutes: number): Date;
    incrementHours(date: Date, numberOfHours: number): Date;
    incrementDays(date: Date, numberOfDays: number): Date;
    incrementMonths(date: Date, numberOfMonths: number): Date;
    getMonthDistance(start: Date, end: Date): number;
    getLastDateOfMonth(date: Date): Date;
    isValidDate(date: Date): boolean;
    setDateTimeToMidnight(date: Date): void;
    createDateAtMidnight(opt_value: any): Date;
    isDateWithinRange(date: Date, minDate: Date, maxDate: Date): boolean;
    incrementYears(date: Date, numberOfYears: number): Date;
    getYearDistance(start: Date, end: Date): number;
    clampDate(date: Date, minDate: Date, maxDate: Date): Date;
    getTimestampFromNode(node: any): number;
    isMonthWithinRange(date: Date, minDate: Date, maxDate: Date): boolean;
}
