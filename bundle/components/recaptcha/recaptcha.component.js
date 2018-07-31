import "../vendor-js/google-recaptcha-api";
import { Component, Input, Output, EventEmitter, ViewChild, } from "@angular/core";
var TeleportReCaptchaComponent = (function () {
    function TeleportReCaptchaComponent() {
        this.callback = new EventEmitter();
        this.expiredCallback = new EventEmitter();
    }
    TeleportReCaptchaComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (window.location.search.indexOf("use-automated-testing-helpers") !== -1) {
            this.callback.emit("use-automated-testing-helpers");
        }
        else if (window.grecaptcha === undefined) {
            setTimeout(function () { return _this.ngAfterViewInit(); }, 200);
        }
        else {
            var id = "recaptcha-" + Math.random().toString(36).substr(2);
            this.renderDiv.nativeElement.id = id;
            var widgetId_1 = window.grecaptcha.render(id, {
                sitekey: this.sitekey,
                theme: this.theme || "light",
                callback: function (evt) { return _this.callback.emit(evt); },
                "expired-callback": function (evt) { return _this.expiredCallback.emit(evt); },
            });
            if (this.onReset) {
                this.subscription = this.onReset.subscribe(function () { return window.grecaptcha.reset(widgetId_1); });
            }
        }
    };
    TeleportReCaptchaComponent.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    TeleportReCaptchaComponent.decorators = [
        { type: Component, args: [{
                    selector: "teleport-sp-recaptcha",
                    template: "<div #renderDiv class=\"g-recaptcha\"></div>",
                },] },
    ];
    TeleportReCaptchaComponent.ctorParameters = function () { return []; };
    TeleportReCaptchaComponent.propDecorators = {
        'renderDiv': [{ type: ViewChild, args: ["renderDiv",] },],
        'sitekey': [{ type: Input },],
        'theme': [{ type: Input },],
        'onReset': [{ type: Input },],
        'callback': [{ type: Output },],
        'expiredCallback': [{ type: Output },],
    };
    return TeleportReCaptchaComponent;
}());
export { TeleportReCaptchaComponent };
//# sourceMappingURL=recaptcha.component.js.map