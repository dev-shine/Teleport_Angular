import { Injectable } from "@angular/core";
var Md2DateUtil = (function () {
    function Md2DateUtil() {
    }
    Md2DateUtil.prototype.getFirstDateOfMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), 1, date.getHours(), date.getMinutes());
    };
    Md2DateUtil.prototype.getNumberOfDaysInMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    Md2DateUtil.prototype.getDateInNextMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1, date.getHours(), date.getMinutes());
    };
    Md2DateUtil.prototype.getDateInPreviousMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1, date.getHours(), date.getMinutes());
    };
    Md2DateUtil.prototype.isSameMonthAndYear = function (d1, d2) {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
    };
    Md2DateUtil.prototype.isSameDay = function (d1, d2) {
        return d1.getDate() == d2.getDate() && this.isSameMonthAndYear(d1, d2);
    };
    Md2DateUtil.prototype.isInNextMonth = function (startDate, endDate) {
        var nextMonth = this.getDateInNextMonth(startDate);
        return this.isSameMonthAndYear(nextMonth, endDate);
    };
    Md2DateUtil.prototype.isInPreviousMonth = function (startDate, endDate) {
        var previousMonth = this.getDateInPreviousMonth(startDate);
        return this.isSameMonthAndYear(endDate, previousMonth);
    };
    Md2DateUtil.prototype.getDateMidpoint = function (d1, d2) {
        return this.createDateAtMidnight((d1.getTime() + d2.getTime()) / 2);
    };
    Md2DateUtil.prototype.getWeekOfMonth = function (date) {
        var firstDayOfMonth = this.getFirstDateOfMonth(date);
        return Math.floor((firstDayOfMonth.getDay() + date.getDate() - 1) / 7);
    };
    Md2DateUtil.prototype.incrementMinutes = function (date, numberOfMinutes) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + numberOfMinutes);
    };
    Md2DateUtil.prototype.incrementHours = function (date, numberOfHours) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + numberOfHours, date.getMinutes());
    };
    Md2DateUtil.prototype.incrementDays = function (date, numberOfDays) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + numberOfDays, date.getHours(), date.getMinutes());
    };
    Md2DateUtil.prototype.incrementMonths = function (date, numberOfMonths) {
        var dateInTargetMonth = new Date(date.getFullYear(), date.getMonth() + numberOfMonths, 1, date.getHours(), date.getMinutes());
        var numberOfDaysInMonth = this.getNumberOfDaysInMonth(dateInTargetMonth);
        if (numberOfDaysInMonth < date.getDate()) {
            dateInTargetMonth.setDate(numberOfDaysInMonth);
        }
        else {
            dateInTargetMonth.setDate(date.getDate());
        }
        return dateInTargetMonth;
    };
    Md2DateUtil.prototype.getMonthDistance = function (start, end) {
        return (12 * (end.getFullYear() - start.getFullYear())) + (end.getMonth() - start.getMonth());
    };
    Md2DateUtil.prototype.getLastDateOfMonth = function (date) {
        return new Date(date.getFullYear(), date.getMonth(), this.getNumberOfDaysInMonth(date), date.getHours(), date.getMinutes());
    };
    Md2DateUtil.prototype.isValidDate = function (date) {
        return date != null && date.getTime && !isNaN(date.getTime());
    };
    Md2DateUtil.prototype.setDateTimeToMidnight = function (date) {
        if (this.isValidDate(date)) {
            date.setHours(0, 0, 0, 0);
        }
    };
    Md2DateUtil.prototype.createDateAtMidnight = function (opt_value) {
        var date;
        if (!opt_value) {
            date = new Date();
        }
        else {
            date = new Date(opt_value);
        }
        this.setDateTimeToMidnight(date);
        return date;
    };
    Md2DateUtil.prototype.isDateWithinRange = function (date, minDate, maxDate) {
        var dateAtMidnight = this.createDateAtMidnight(date);
        var minDateAtMidnight = this.isValidDate(minDate) ? this.createDateAtMidnight(minDate) : null;
        var maxDateAtMidnight = this.isValidDate(maxDate) ? this.createDateAtMidnight(maxDate) : null;
        return (!minDateAtMidnight || minDateAtMidnight <= dateAtMidnight) &&
            (!maxDateAtMidnight || maxDateAtMidnight >= dateAtMidnight);
    };
    Md2DateUtil.prototype.incrementYears = function (date, numberOfYears) {
        return this.incrementMonths(date, numberOfYears * 12);
    };
    Md2DateUtil.prototype.getYearDistance = function (start, end) {
        return end.getFullYear() - start.getFullYear();
    };
    Md2DateUtil.prototype.clampDate = function (date, minDate, maxDate) {
        var boundDate = date;
        if (minDate && date < minDate) {
            boundDate = new Date(minDate.getTime());
        }
        if (maxDate && date > maxDate) {
            boundDate = new Date(maxDate.getTime());
        }
        return boundDate;
    };
    Md2DateUtil.prototype.getTimestampFromNode = function (node) {
        if (node && node.hasAttribute('data-timestamp')) {
            return Number(node.getAttribute('data-timestamp'));
        }
    };
    Md2DateUtil.prototype.isMonthWithinRange = function (date, minDate, maxDate) {
        var month = date.getMonth();
        var year = date.getFullYear();
        return (!minDate || minDate.getFullYear() < year || minDate.getMonth() <= month) &&
            (!maxDate || maxDate.getFullYear() > year || maxDate.getMonth() >= month);
    };
    Md2DateUtil.decorators = [
        { type: Injectable },
    ];
    Md2DateUtil.ctorParameters = function () { return []; };
    return Md2DateUtil;
}());
export { Md2DateUtil };
//# sourceMappingURL=dateUtil.js.map