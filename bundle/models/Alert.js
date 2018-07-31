var Alert = (function () {
    function Alert(alert) {
        this._id = alert.id;
        this._firstname = alert.firstname;
        this._lastname = alert.lastname;
        this._email = alert.email;
        this._phone_no = alert.phone_no;
        this._send_receipt_on_payment = alert.send_receipt_on_payment;
        this._notify_on_app_payment = alert.notify_on_app_payment;
        this._account_balance = new AlertAccountBalance(alert.account_balance);
    }
    Object.defineProperty(Alert.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Alert.prototype, "firstname", {
        get: function () {
            return this._firstname;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Alert.prototype, "lastname", {
        get: function () {
            return this._lastname;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Alert.prototype, "email", {
        get: function () {
            return this._email;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Alert.prototype, "phone_no", {
        get: function () {
            return this._phone_no;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Alert.prototype, "send_receipt_on_payment", {
        get: function () {
            return this._send_receipt_on_payment;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Alert.prototype, "notify_on_app_payment", {
        get: function () {
            return this._notify_on_app_payment;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Alert.prototype, "account_balance", {
        get: function () {
            return this._account_balance;
        },
        enumerable: true,
        configurable: true
    });
    Alert.prototype.toJSON = function () {
        return {
            id: this.id,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            phone_no: this.phone_no,
            send_receipt_on_payment: this.send_receipt_on_payment,
            notify_on_app_payment: this.notify_on_app_payment,
            account_balance: this.account_balance.toJSON(),
        };
    };
    return Alert;
}());
export { Alert };
var AlertAccountBalance = (function () {
    function AlertAccountBalance(balance) {
        if (balance !== undefined) {
            this._minutes_before_zero = balance.minutes_before_zero;
            this._thresholds = balance.thresholds;
        }
    }
    Object.defineProperty(AlertAccountBalance.prototype, "minutes_before_zero", {
        get: function () {
            return this._minutes_before_zero;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AlertAccountBalance.prototype, "thresholds", {
        get: function () {
            return this._thresholds;
        },
        enumerable: true,
        configurable: true
    });
    AlertAccountBalance.prototype.toJSON = function () {
        return {
            minutes_before_zero: this.minutes_before_zero,
            thresholds: this.thresholds,
        };
    };
    return AlertAccountBalance;
}());
export { AlertAccountBalance };
//# sourceMappingURL=Alert.js.map