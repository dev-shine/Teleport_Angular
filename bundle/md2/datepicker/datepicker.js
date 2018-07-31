var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, HostListener, Input, Output, EventEmitter, forwardRef, ViewEncapsulation, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Md2DateUtil } from './dateUtil';
import { BooleanFieldValue, KeyCodes } from '../core/core';
var noop = function () { };
var nextId = 0;
export var MD2_DATEPICKER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Datepicker; }),
    multi: true
};
var Md2Datepicker = (function () {
    function Md2Datepicker(dateUtil, element) {
        this.dateUtil = dateUtil;
        this.element = element;
        this._value = null;
        this._isInitialized = false;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this.isHoursVisible = true;
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.hours = [];
        this.minutes = [];
        this.prevMonth = 1;
        this.currMonth = 2;
        this.nextMonth = 3;
        this.years = [];
        this.dates = [];
        this.today = new Date();
        this._displayDate = null;
        this.selectedDate = null;
        this.displayDay = { year: 0, month: '', date: '', day: '', hour: '', minute: '' };
        this.displayInputDate = '';
        this.clock = {
            dialRadius: 120,
            outerRadius: 99,
            innerRadius: 66,
            tickRadius: 17,
            hand: { x: 0, y: 0 },
            x: 0, y: 0,
            dx: 0, dy: 0,
            moved: false
        };
        this.change = new EventEmitter();
        this.type = 'date';
        this.disabled = false;
        this.name = '';
        this.id = 'md2-datepicker-' + (++nextId);
        this.format = this.type === 'date' ? 'DD/MM/YYYY' : this.type === 'time' ? 'HH:mm' : this.type === 'datetime' ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY';
        this.tabindex = 0;
        this._minDate = null;
        this._maxDate = null;
        this.getYears();
        this.generateClock();
    }
    Md2Datepicker.prototype.ngAfterContentInit = function () {
        this._isInitialized = true;
        this.isCalendarVisible = this.type !== 'time' ? true : false;
    };
    Object.defineProperty(Md2Datepicker.prototype, "min", {
        set: function (value) {
            this._minDate = new Date(value);
            this._minDate.setHours(0, 0, 0, 0);
            this.getYears();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "max", {
        set: function (value) {
            this._maxDate = new Date(value);
            this._maxDate.setHours(0, 0, 0, 0);
            this.getYears();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "value", {
        get: function () { return this._value; },
        set: function (value) {
            if (value && value !== this._value) {
                if (this.dateUtil.isValidDate(value)) {
                    this._value = value;
                }
                else {
                    if (this.type === 'time') {
                        this._value = new Date('1-1-1 ' + value);
                    }
                    else {
                        this._value = new Date(value);
                    }
                }
                this.displayInputDate = this._formatDate(this._value);
                var date = '';
                if (this.type !== 'time') {
                    date += this._value.getFullYear() + '-' + (this._value.getMonth() + 1) + '-' + this._value.getDate();
                }
                if (this.type === 'datetime') {
                    date += ' ';
                }
                if (this.type !== 'date') {
                    date += this._value.getHours() + ':' + this._value.getMinutes();
                }
                if (this._isInitialized) {
                    this._onChangeCallback(date);
                    this.change.emit(date);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Datepicker.prototype, "displayDate", {
        get: function () {
            if (this._displayDate && this.dateUtil.isValidDate(this._displayDate)) {
                return this._displayDate;
            }
            else {
                return this.today;
            }
        },
        set: function (date) {
            if (date && this.dateUtil.isValidDate(date)) {
                if (this._minDate && this._minDate > date) {
                    date = this._minDate;
                }
                if (this._maxDate && this._maxDate < date) {
                    date = this._maxDate;
                }
                this._displayDate = date;
                this.displayDay = {
                    year: date.getFullYear(),
                    month: this.months[date.getMonth()],
                    date: this._prependZero(date.getDate() + ''),
                    day: this.days[date.getDay()],
                    hour: this._prependZero(date.getHours() + ''),
                    minute: this._prependZero(date.getMinutes() + '')
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    Md2Datepicker.prototype.onClick = function (event) {
        if (this.disabled) {
            event.stopPropagation();
            event.preventDefault();
            return;
        }
    };
    Md2Datepicker.prototype.onKeyDown = function (event) {
        if (this.disabled) {
            return;
        }
        if (this.isDatepickerVisible) {
            event.preventDefault();
            event.stopPropagation();
            switch (event.keyCode) {
                case KeyCodes.TAB:
                case KeyCodes.ESCAPE:
                    this.onBlur();
                    break;
            }
            var displayDate = this.displayDate;
            if (this.isYearsVisible) {
                switch (event.keyCode) {
                    case KeyCodes.ENTER:
                    case KeyCodes.SPACE:
                        this.onClickOk();
                        break;
                    case KeyCodes.DOWN_ARROW:
                        if (this.displayDate.getFullYear() === (this.today.getFullYear() + 100))
                            break;
                        this.displayDate = this.dateUtil.incrementYears(displayDate, 1);
                        this._scrollToSelectedYear();
                        break;
                    case KeyCodes.UP_ARROW:
                        if (this.displayDate.getFullYear() === 1900)
                            break;
                        this.displayDate = this.dateUtil.incrementYears(displayDate, -1);
                        this._scrollToSelectedYear();
                        break;
                }
            }
            else if (this.isCalendarVisible) {
                switch (event.keyCode) {
                    case KeyCodes.ENTER:
                    case KeyCodes.SPACE:
                        this.setDate(this.displayDate);
                        break;
                    case KeyCodes.RIGHT_ARROW:
                        this.displayDate = this.dateUtil.incrementDays(displayDate, 1);
                        break;
                    case KeyCodes.LEFT_ARROW:
                        this.displayDate = this.dateUtil.incrementDays(displayDate, -1);
                        break;
                    case KeyCodes.PAGE_DOWN:
                        this.displayDate = this.dateUtil.incrementMonths(displayDate, 1);
                        break;
                    case KeyCodes.PAGE_UP:
                        this.displayDate = this.dateUtil.incrementMonths(displayDate, -1);
                        break;
                    case KeyCodes.DOWN_ARROW:
                        this.displayDate = this.dateUtil.incrementDays(displayDate, 7);
                        break;
                    case KeyCodes.UP_ARROW:
                        this.displayDate = this.dateUtil.incrementDays(displayDate, -7);
                        break;
                    case KeyCodes.HOME:
                        this.displayDate = this.dateUtil.getFirstDateOfMonth(displayDate);
                        break;
                    case KeyCodes.END:
                        this.displayDate = this.dateUtil.getLastDateOfMonth(displayDate);
                        break;
                }
                if (!this.dateUtil.isSameMonthAndYear(displayDate, this.displayDate)) {
                    this.generateCalendar();
                }
            }
            else if (this.isHoursVisible) {
                switch (event.keyCode) {
                    case KeyCodes.ENTER:
                    case KeyCodes.SPACE:
                        this.setHour(this.displayDate.getHours());
                        break;
                    case KeyCodes.UP_ARROW:
                        this.displayDate = this.dateUtil.incrementHours(displayDate, 1);
                        this._resetClock();
                        break;
                    case KeyCodes.DOWN_ARROW:
                        this.displayDate = this.dateUtil.incrementHours(displayDate, -1);
                        this._resetClock();
                        break;
                }
            }
            else {
                switch (event.keyCode) {
                    case KeyCodes.ENTER:
                    case KeyCodes.SPACE:
                        this.setMinute(this.displayDate.getMinutes());
                        break;
                    case KeyCodes.UP_ARROW:
                        this.displayDate = this.dateUtil.incrementMinutes(displayDate, 1);
                        this._resetClock();
                        break;
                    case KeyCodes.DOWN_ARROW:
                        this.displayDate = this.dateUtil.incrementMinutes(displayDate, -1);
                        this._resetClock();
                        break;
                }
            }
        }
        else {
            switch (event.keyCode) {
                case KeyCodes.ENTER:
                case KeyCodes.SPACE:
                    event.preventDefault();
                    event.stopPropagation();
                    this.showDatepicker();
                    break;
            }
        }
    };
    Md2Datepicker.prototype.onBlur = function () {
        this.isDatepickerVisible = false;
        this.isYearsVisible = false;
        this.isCalendarVisible = this.type !== 'time' ? true : false;
        this.isHoursVisible = true;
    };
    Md2Datepicker.prototype.showYear = function () {
        this.isYearsVisible = true;
        this.isCalendarVisible = true;
        this._scrollToSelectedYear();
    };
    Md2Datepicker.prototype.getYears = function () {
        var startYear = this._minDate ? this._minDate.getFullYear() : 1900, endYear = this._maxDate ? this._maxDate.getFullYear() : this.today.getFullYear() + 100;
        this.years = [];
        for (var i = startYear; i <= endYear; i++) {
            this.years.push(i);
        }
    };
    Md2Datepicker.prototype._scrollToSelectedYear = function () {
        var _this = this;
        setTimeout(function () {
            var yearContainer = _this.element.nativeElement.querySelector('.md2-years'), selectedYear = _this.element.nativeElement.querySelector('.md2-year.selected');
            yearContainer.scrollTop = (selectedYear.offsetTop + 20) - yearContainer.clientHeight / 2;
        }, 0);
    };
    Md2Datepicker.prototype.setYear = function (year) {
        var date = this.displayDate;
        this.displayDate = new Date(year, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
        this.generateCalendar();
        this.isYearsVisible = false;
    };
    Md2Datepicker.prototype.showDatepicker = function () {
        if (this.disabled) {
            return;
        }
        this.isDatepickerVisible = true;
        this.selectedDate = this.value || new Date(1, 0, 1);
        this.displayDate = this.value || this.today;
        this.generateCalendar();
        this._resetClock();
        this.element.nativeElement.focus();
    };
    Md2Datepicker.prototype.showCalendar = function () {
        this.isYearsVisible = false;
        this.isCalendarVisible = true;
    };
    Md2Datepicker.prototype.toggleHours = function (value) {
        this.isYearsVisible = false;
        this.isCalendarVisible = false;
        this.isYearsVisible = false;
        this.isHoursVisible = value;
        this._resetClock();
    };
    Md2Datepicker.prototype.onClickOk = function () {
        if (this.isYearsVisible) {
            this.generateCalendar();
            this.isYearsVisible = false;
            this.isCalendarVisible = true;
        }
        else if (this.isCalendarVisible) {
            this.setDate(this.displayDate);
        }
        else if (this.isHoursVisible) {
            this.isHoursVisible = false;
            this._resetClock();
        }
        else {
            this.value = this.displayDate;
            this.onBlur();
        }
    };
    Md2Datepicker.prototype.onClickDate = function (event, date) {
        event.preventDefault();
        event.stopPropagation();
        if (date.disabled) {
            return;
        }
        if (date.calMonth === this.prevMonth) {
            this.updateMonth(-1);
        }
        else if (date.calMonth === this.currMonth) {
            this.setDate(new Date(date.dateObj.year, date.dateObj.month, date.dateObj.day, this.displayDate.getHours(), this.displayDate.getMinutes()));
        }
        else if (date.calMonth === this.nextMonth) {
            this.updateMonth(1);
        }
    };
    Md2Datepicker.prototype.setDate = function (date) {
        if (this.type === 'date') {
            this.value = date;
            this.onBlur();
        }
        else {
            this.selectedDate = date;
            this.displayDate = date;
            this.isCalendarVisible = false;
            this.isHoursVisible = true;
            this._resetClock();
        }
    };
    Md2Datepicker.prototype.updateMonth = function (noOfMonths) {
        this.displayDate = this.dateUtil.incrementMonths(this.displayDate, noOfMonths);
        this.generateCalendar();
    };
    Md2Datepicker.prototype.isBeforeMonth = function () {
        return !this._minDate ? true : this._minDate && this.dateUtil.getMonthDistance(this.displayDate, this._minDate) < 0;
    };
    Md2Datepicker.prototype.isAfterMonth = function () {
        return !this._maxDate ? true : this._maxDate && this.dateUtil.getMonthDistance(this.displayDate, this._maxDate) > 0;
    };
    Md2Datepicker.prototype._isDisabledDate = function (date) {
        if (this._minDate && this._maxDate) {
            return (this._minDate > date) || (this._maxDate < date);
        }
        else if (this._minDate) {
            return (this._minDate > date);
        }
        else if (this._maxDate) {
            return (this._maxDate < date);
        }
        else {
            return false;
        }
    };
    Md2Datepicker.prototype.generateCalendar = function () {
        var year = this.displayDate.getFullYear();
        var month = this.displayDate.getMonth();
        this.dates.length = 0;
        var firstDayOfMonth = this.dateUtil.getFirstDateOfMonth(this.displayDate);
        var numberOfDaysInMonth = this.dateUtil.getNumberOfDaysInMonth(this.displayDate);
        var numberOfDaysInPrevMonth = this.dateUtil.getNumberOfDaysInMonth(this.dateUtil.incrementMonths(this.displayDate, -1));
        var dayNbr = 1;
        var calMonth = this.prevMonth;
        for (var i = 1; i < 7; i++) {
            var week = [];
            if (i === 1) {
                var prevMonth = numberOfDaysInPrevMonth - firstDayOfMonth.getDay() + 1;
                for (var j = prevMonth; j <= numberOfDaysInPrevMonth; j++) {
                    var iDate = { year: year, month: month - 1, day: j, hour: 0, minute: 0 };
                    var date = new Date(year, month - 1, j);
                    week.push({
                        date: date,
                        dateObj: iDate,
                        calMonth: calMonth,
                        today: this.dateUtil.isSameDay(this.today, date),
                        disabled: this._isDisabledDate(date)
                    });
                }
                calMonth = this.currMonth;
                var daysLeft = 7 - week.length;
                for (var j = 0; j < daysLeft; j++) {
                    var iDate = { year: year, month: month, day: dayNbr, hour: 0, minute: 0 };
                    var date = new Date(year, month, dayNbr);
                    week.push({
                        date: date,
                        dateObj: iDate,
                        calMonth: calMonth,
                        today: this.dateUtil.isSameDay(this.today, date),
                        disabled: this._isDisabledDate(date)
                    });
                    dayNbr++;
                }
            }
            else {
                for (var j = 1; j < 8; j++) {
                    if (dayNbr > numberOfDaysInMonth) {
                        dayNbr = 1;
                        calMonth = this.nextMonth;
                    }
                    var iDate = { year: year, month: calMonth === this.currMonth ? month : month + 1, day: dayNbr, hour: 0, minute: 0 };
                    var date = new Date(year, iDate.month, dayNbr);
                    week.push({
                        date: date,
                        dateObj: iDate,
                        calMonth: calMonth,
                        today: this.dateUtil.isSameDay(this.today, date),
                        disabled: this._isDisabledDate(date)
                    });
                    dayNbr++;
                }
            }
            this.dates.push(week);
        }
    };
    Md2Datepicker.prototype.onClickHour = function (event, hour) {
        event.preventDefault();
        event.stopPropagation();
        this.setHour(hour);
    };
    Md2Datepicker.prototype.onClickMinute = function (event, minute) {
        event.preventDefault();
        event.stopPropagation();
        this.setMinute(minute);
    };
    Md2Datepicker.prototype.setHour = function (hour) {
        var date = this.displayDate;
        this.isHoursVisible = false;
        this.displayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, date.getMinutes());
        this._resetClock();
    };
    Md2Datepicker.prototype.setMinute = function (minute) {
        var date = this.displayDate;
        this.displayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), minute);
        this.selectedDate = this.displayDate;
        this.value = this.selectedDate;
        this.onBlur();
    };
    Md2Datepicker.prototype._resetClock = function () {
        var hour = this.displayDate.getHours();
        var minute = this.displayDate.getMinutes();
        var value = this.isHoursVisible ? hour : minute, unit = Math.PI / (this.isHoursVisible ? 6 : 30), radian = value * unit, radius = this.isHoursVisible && value > 0 && value < 13 ? this.clock.innerRadius : this.clock.outerRadius, x = Math.sin(radian) * radius, y = -Math.cos(radian) * radius;
        this._setClockHand(x, y);
    };
    Md2Datepicker.prototype._setClockHand = function (x, y) {
        var radian = Math.atan2(x, y), unit = Math.PI / (this.isHoursVisible ? 6 : 30), z = Math.sqrt(x * x + y * y), inner = this.isHoursVisible && z < (this.clock.outerRadius + this.clock.innerRadius) / 2, radius = inner ? this.clock.innerRadius : this.clock.outerRadius, value = 0;
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        value = Math.round(radian / unit);
        radian = value * unit;
        if (this.isHoursVisible) {
            if (value === 12) {
                value = 0;
            }
            value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
        }
        else {
            if (value === 60) {
                value = 0;
            }
        }
        this.clock.hand = {
            x: Math.sin(radian) * radius,
            y: Math.cos(radian) * radius
        };
    };
    Md2Datepicker.prototype.generateClock = function () {
        this.hours.length = 0;
        for (var i = 0; i < 24; i++) {
            var radian = i / 6 * Math.PI;
            var inner = i > 0 && i < 13, radius = inner ? this.clock.innerRadius : this.clock.outerRadius;
            this.hours.push({
                hour: i === 0 ? '00' : i,
                top: this.clock.dialRadius - Math.cos(radian) * radius - this.clock.tickRadius,
                left: this.clock.dialRadius + Math.sin(radian) * radius - this.clock.tickRadius
            });
        }
        for (var i = 0; i < 60; i += 5) {
            var radian = i / 30 * Math.PI;
            this.minutes.push({
                minute: i === 0 ? '00' : i,
                top: this.clock.dialRadius - Math.cos(radian) * this.clock.outerRadius - this.clock.tickRadius,
                left: this.clock.dialRadius + Math.sin(radian) * this.clock.outerRadius - this.clock.tickRadius
            });
        }
    };
    Md2Datepicker.prototype._formatDate = function (date) {
        return this.format
            .replace('YYYY', date.getFullYear() + '')
            .replace('MM', this._prependZero((date.getMonth() + 1) + ''))
            .replace('DD', this._prependZero(date.getDate() + ''))
            .replace('HH', this._prependZero(date.getHours() + ''))
            .replace('mm', this._prependZero(date.getMinutes() + ''))
            .replace('ss', this._prependZero(date.getSeconds() + ''));
    };
    Md2Datepicker.prototype._prependZero = function (value) {
        return parseInt(value) < 10 ? '0' + value : value;
    };
    Md2Datepicker.prototype._offset = function (element) {
        var top = 0, left = 0;
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while (element);
        return {
            top: top,
            left: left
        };
    };
    Md2Datepicker.prototype.writeValue = function (value) {
        if (value && value !== this._value) {
            if (this.dateUtil.isValidDate(value)) {
                this._value = value;
            }
            else {
                if (this.type === 'time') {
                    this._value = new Date('1-1-1 ' + value);
                }
                else {
                    this._value = new Date(value);
                }
            }
            this.displayInputDate = this._formatDate(this._value);
            var date = '';
            if (this.type !== 'time') {
                date += this._value.getFullYear() + '-' + (this._value.getMonth() + 1) + '-' + this._value.getDate();
            }
            if (this.type === 'datetime') {
                date += ' ';
            }
            if (this.type !== 'date') {
                date += this._value.getHours() + ':' + this._value.getMinutes();
            }
        }
    };
    Md2Datepicker.prototype.registerOnChange = function (fn) { this._onChangeCallback = fn; };
    Md2Datepicker.prototype.registerOnTouched = function (fn) { this._onTouchedCallback = fn; };
    Md2Datepicker.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: 'md2-datepicker',
                    templateUrl: 'datepicker.html',
                    styleUrls: ['datepicker.css'],
                    providers: [MD2_DATEPICKER_CONTROL_VALUE_ACCESSOR],
                    host: {
                        'role': 'datepicker',
                        '[id]': 'id',
                        '[class]': 'class',
                        '[class.md2-datepicker-disabled]': 'disabled',
                        '[tabindex]': 'disabled ? -1 : tabindex',
                        '[attr.aria-disabled]': 'disabled'
                    },
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    Md2Datepicker.ctorParameters = function () { return [
        { type: Md2DateUtil, },
        { type: ElementRef, },
    ]; };
    Md2Datepicker.propDecorators = {
        'change': [{ type: Output },],
        'type': [{ type: Input },],
        'disabled': [{ type: Input },],
        'name': [{ type: Input },],
        'id': [{ type: Input },],
        'class': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'format': [{ type: Input },],
        'tabindex': [{ type: Input },],
        'min': [{ type: Input },],
        'max': [{ type: Input },],
        'value': [{ type: Input },],
        'onClick': [{ type: HostListener, args: ['click', ['$event'],] },],
        'onKeyDown': [{ type: HostListener, args: ['keydown', ['$event'],] },],
        'onBlur': [{ type: HostListener, args: ['blur',] },],
    };
    __decorate([
        BooleanFieldValue(),
        __metadata("design:type", Boolean)
    ], Md2Datepicker.prototype, "disabled", void 0);
    return Md2Datepicker;
}());
export { Md2Datepicker };
export var MD2_DATEPICKER_DIRECTIVES = [Md2Datepicker];
var Md2DatepickerModule = (function () {
    function Md2DatepickerModule() {
    }
    Md2DatepickerModule.forRoot = function () {
        return {
            ngModule: Md2DatepickerModule,
            providers: [Md2DateUtil]
        };
    };
    Md2DatepickerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: MD2_DATEPICKER_DIRECTIVES,
                    imports: [CommonModule, FormsModule],
                    exports: MD2_DATEPICKER_DIRECTIVES,
                },] },
    ];
    Md2DatepickerModule.ctorParameters = function () { return []; };
    return Md2DatepickerModule;
}());
export { Md2DatepickerModule };
//# sourceMappingURL=datepicker.js.map