import { Component, Inject } from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import { Store } from "@ngrx/store";
import { MessageService } from "../../../services/message.service";
import { EmailValidator } from "../../../utils/EmailValidator";
var TeleportDevPortalSupportFormComponent = (function () {
    function TeleportDevPortalSupportFormComponent(http, messages, store$) {
        this.http = http;
        this.messages = messages;
        this.store$ = store$;
        this.form = {
            account: "",
            app: "N/A",
            name: "",
            email: "",
            phone: "",
            topic: "bug_report",
            priority: "normal",
            description: "",
        };
        this.Applications = [];
        this.isSubmitted = false;
        this.isSuccess = false;
    }
    TeleportDevPortalSupportFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSubmitted = false;
        this.isSuccess = false;
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just(); })
            .subscribe(function (s) {
            _this.form.account = s.userData.id;
            _this.form.name = s.userData.firstName + " " + s.userData.lastName;
            _this.form.email = s.userData.email;
            _this.form.phone = s.userData.phone || "";
        });
        this.store$.select("v1_applications")
            .first()
            .subscribe(function (a) { return _this.Applications = a; });
    };
    TeleportDevPortalSupportFormComponent.prototype.isEmailValid = function (email) {
        return EmailValidator.isValid(email);
    };
    TeleportDevPortalSupportFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isSubmitted = true;
        var headers = new Headers({ "Content-Type": "application/json" });
        var options = new RequestOptions({ headers: headers, withCredentials: true });
        this.http
            .post(API_BASE_URL + "/support", JSON.stringify(this.form), options)
            .catch(function (err) { return Observable.throw(new Error(err.json().user_message)); })
            .toPromise()
            .then(function () {
            _this.isSuccess = true;
            _this.isSubmitted = false;
            _this.form = {
                account: "",
                app: "N/A",
                name: "",
                email: "",
                phone: "",
                topic: "bug_report",
                priority: "normal",
                description: "",
            };
            _this.messages.info("Support Request Delivered", "We will respond as soon as possible.");
        })
            .catch(function (err) {
            _this.isSuccess = false;
            _this.isSubmitted = false;
            _this.messages.error("Registration Failed", err.message, err);
        });
    };
    TeleportDevPortalSupportFormComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-support-form",
                    templateUrl: "support.html",
                },] },
    ];
    TeleportDevPortalSupportFormComponent.ctorParameters = function () { return [
        { type: Http, decorators: [{ type: Inject, args: [Http,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    return TeleportDevPortalSupportFormComponent;
}());
export { TeleportDevPortalSupportFormComponent };
//# sourceMappingURL=support.component.js.map