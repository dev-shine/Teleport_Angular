import { AfterContentInit, ElementRef, EventEmitter, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Md2DateUtil } from './dateUtil';
export interface IDay {
    year: number;
    month: string;
    date: string;
    day: string;
    hour: string;
    minute: string;
}
export interface IDate {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}
export interface IWeek {
    dateObj: IDate;
    date: Date;
    calMonth: number;
    today: boolean;
    disabled: boolean;
}
export declare const MD2_DATEPICKER_CONTROL_VALUE_ACCESSOR: any;
export declare class Md2Datepicker implements AfterContentInit, ControlValueAccessor {
    private dateUtil;
    private element;
    constructor(dateUtil: Md2DateUtil, element: ElementRef);
    ngAfterContentInit(): void;
    private _value;
    private _isInitialized;
    private _onTouchedCallback;
    private _onChangeCallback;
    private isDatepickerVisible;
    private isYearsVisible;
    private isCalendarVisible;
    private isHoursVisible;
    private months;
    private days;
    private hours;
    private minutes;
    private prevMonth;
    private currMonth;
    private nextMonth;
    private years;
    private dates;
    private today;
    private _displayDate;
    private selectedDate;
    private displayDay;
    private displayInputDate;
    private clock;
    change: EventEmitter<any>;
    type: 'date' | 'time' | 'datetime';
    disabled: boolean;
    name: string;
    id: string;
    class: string;
    placeholder: string;
    format: string;
    tabindex: number;
    private _minDate;
    private _maxDate;
    min: string;
    max: string;
    value: any;
    displayDate: Date;
    private onClick(event);
    private onKeyDown(event);
    private onBlur();
    private showYear();
    private getYears();
    private _scrollToSelectedYear();
    private setYear(year);
    private showDatepicker();
    private showCalendar();
    private toggleHours(value);
    private onClickOk();
    private onClickDate(event, date);
    private setDate(date);
    private updateMonth(noOfMonths);
    private isBeforeMonth();
    private isAfterMonth();
    private _isDisabledDate(date);
    private generateCalendar();
    private onClickHour(event, hour);
    private onClickMinute(event, minute);
    private setHour(hour);
    private setMinute(minute);
    private _resetClock();
    private _setClockHand(x, y);
    private generateClock();
    private _formatDate(date);
    private _prependZero(value);
    private _offset(element);
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
export declare const MD2_DATEPICKER_DIRECTIVES: (typeof Md2Datepicker)[];
export declare class Md2DatepickerModule {
    static forRoot(): ModuleWithProviders;
}
