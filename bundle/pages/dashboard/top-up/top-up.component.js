import { Component, Inject } from "@angular/core";
import "rxjs/add/operator/skipWhile";
import { TopUpService } from "../../../services/top-up.service";
import { MessageService } from "../../../services/message.service";
import { TeleportLoaderService } from "teleport-module-loader";
var TeleportDevPortalTopUpComponent = (function () {
    function TeleportDevPortalTopUpComponent(topUp, messages, loader) {
        this.topUp = topUp;
        this.messages = messages;
        this.loader = loader;
        this.isEditTopUp = false;
    }
    TeleportDevPortalTopUpComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loader.show("Finding your top-up info...");
        this._subscription = this.topUp.Observable
            .skipWhile(function (resp) { return !resp; })
            .subscribe(function (resp) {
            _this._topup = resp;
            _this.loader.hide();
            _this.isEditTopUp = false;
            _this.TopUp = Object.assign({}, _this._topup);
        }, function (err) {
            _this.messages.error("Top Up Error", err.message, err);
            _this.loader.hide();
            _this.TopUp = Object.assign({}, _this._topup);
        });
    };
    TeleportDevPortalTopUpComponent.prototype.ngOnDestroy = function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    };
    TeleportDevPortalTopUpComponent.prototype.onStartEditMode = function () {
        this.isEditTopUp = true;
        this.TopUp = Object.assign({}, this._topup);
        this.TopUp.amount = this._topup.amount || 10;
        this.TopUp.balanceThreshold = this._topup.balanceThreshold || 10;
        this.TopUp.maxAmountPerDay = this._topup.maxAmountPerDay || 20;
    };
    TeleportDevPortalTopUpComponent.prototype.validateAmount = function () {
        if (this.TopUp.amount < 10) {
            return "The amount must be more than $10.";
        }
        if (this.TopUp.amount < this.TopUp.balanceThreshold / 4) {
            return "The automatic charge cannot be less than 1/4 of the balance threshold (currently $" + (this.TopUp.balanceThreshold / 4).toFixed(2) + ").";
        }
        if (this.TopUp.amount > this.TopUp.maxAmountPerDay) {
            return "The automatic charge cannot be greater then the total charges per day limit.";
        }
        return null;
    };
    TeleportDevPortalTopUpComponent.prototype.validateThreshold = function () {
        if (this.TopUp.balanceThreshold < 10) {
            return "The balance threshold cannot be less than $10.";
        }
        if (this.TopUp.balanceThreshold > this._topup.maxAmountPerDayLimit) {
            return "The balance threshold cannot exceed the daily spend limit.";
        }
        return null;
    };
    TeleportDevPortalTopUpComponent.prototype.validateMaxDaily = function () {
        if (this.TopUp.maxAmountPerDay < this.TopUp.amount) {
            return "The max total charged per day cannot be less then the automatic charge amount.";
        }
        if (this.TopUp.maxAmountPerDay > this._topup.maxAmountPerDayLimit) {
            return "The max total charged per day cannot exceed the daily spend limit.";
        }
        return null;
    };
    TeleportDevPortalTopUpComponent.prototype.onCancel = function () {
        this.isEditTopUp = false;
        this.TopUp = Object.assign({}, this._topup);
    };
    TeleportDevPortalTopUpComponent.prototype.onDeactivate = function () {
        this.TopUp.amount = 0;
        this.TopUp.maxAmountPerDay = 0;
        this.TopUp.balanceThreshold = 0;
        this.onSubmit();
    };
    TeleportDevPortalTopUpComponent.prototype.onSubmit = function () {
        this.isEditTopUp = false;
        this.topUp.updateTopUp(this.TopUp);
        if (this.TopUp.amount > 0) {
            this.messages.info("Top-Up Updated!", "An amount of $" + this.TopUp.amount.toFixed(2) + " will automatically be charged while the balance is lower than $" + this.TopUp.balanceThreshold.toFixed(2) + ".");
        }
    };
    TeleportDevPortalTopUpComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-top-up",
                    templateUrl: "top-up.html",
                },] },
    ];
    TeleportDevPortalTopUpComponent.ctorParameters = function () { return [
        { type: TopUpService, decorators: [{ type: Inject, args: [TopUpService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
        { type: TeleportLoaderService, decorators: [{ type: Inject, args: [TeleportLoaderService,] },] },
    ]; };
    return TeleportDevPortalTopUpComponent;
}());
export { TeleportDevPortalTopUpComponent };
//# sourceMappingURL=top-up.component.js.map