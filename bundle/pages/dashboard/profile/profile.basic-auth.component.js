import { Component, Inject } from "@angular/core";
import "rxjs/add/operator/first";
import { Store, ReducerManagerDispatcher } from "@ngrx/store";
import { MessageService } from "../../../services/message.service";
import { ModalService } from "../../../services/modal.service";
import { AccountCredentialsService } from "../../../services/account.credentials.service";
var TeleportDevPortalProfileBasicAuthComponent = (function () {
    function TeleportDevPortalProfileBasicAuthComponent(modal, messages, creds, store$, dispatcher) {
        this.modal = modal;
        this.messages = messages;
        this.creds = creds;
        this.store$ = store$;
        this.dispatcher = dispatcher;
        this.isBusy = false;
        this.Credentials = [];
        this.isBusy = true;
    }
    TeleportDevPortalProfileBasicAuthComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.isBusy = true;
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just().userData; })
            .subscribe(function (dev) {
            _this._userId = dev.portalUser ? dev.portalUser.developerId : dev.id;
            _this.creds.list(_this._userId)
                .then(function (auths) {
                _this.Credentials = auths.map(function (a) { return ({
                    userName: a.userName,
                    password: a.password,
                    authorization: "Basic " + btoa(a.userName + ":" + a.password),
                }); });
                _this.isBusy = false;
            })
                .catch(function (err) {
                console.error(err.stack);
                _this.messages.error("Credentials Not Found", "Your Basic Auth credentials were not loaded.");
                _this.isBusy = false;
            });
        });
    };
    TeleportDevPortalProfileBasicAuthComponent.prototype.ngOnDestroy = function () {
        delete this.Credentials;
        delete this._userId;
    };
    TeleportDevPortalProfileBasicAuthComponent.prototype.create = function () {
        var _this = this;
        this.isBusy = true;
        this.creds.create(this._userId)
            .then(function (auths) {
            _this.Credentials = auths.map(function (a) { return ({
                userName: a.userName,
                password: a.password,
                authorization: "Basic " + btoa(a.userName + ":" + a.password),
            }); });
            _this.isBusy = false;
        })
            .catch(function (err) {
            console.error(err.stack);
            _this.messages.error("Create Credentials Failure", "Your new Basic Auth credentials were not created.");
            _this.isBusy = false;
        });
    };
    TeleportDevPortalProfileBasicAuthComponent.prototype.remove = function (cred) {
        var _this = this;
        this.modal.show("Delete Credential", "<p>Clicking OK will delete the Basic Auth credential.</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (result) {
            if (result) {
                _this.isBusy = true;
                _this.creds.remove(_this._userId, cred.password)
                    .then(function (auths) {
                    _this.Credentials = auths.map(function (a) { return ({
                        userName: a.userName,
                        password: a.password,
                        authorization: "Basic " + btoa(a.userName + ":" + a.password),
                    }); });
                    _this.isBusy = false;
                })
                    .catch(function (err) {
                    console.error(err.stack);
                    _this.messages.error("Remove Credentials Failure", "Your Basic Auth credentials were not removed.");
                    _this.isBusy = false;
                });
            }
        });
    };
    TeleportDevPortalProfileBasicAuthComponent.prototype.apiKeyInputFocus = function (event) {
        event.target.type = "text";
        event.target.select();
    };
    TeleportDevPortalProfileBasicAuthComponent.prototype.apiKeyInputBlur = function (event) {
        event.target.type = "password";
    };
    TeleportDevPortalProfileBasicAuthComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-dashboard-profile-basic-auth",
                    templateUrl: "profile.basic-auth.html",
                },] },
    ];
    TeleportDevPortalProfileBasicAuthComponent.ctorParameters = function () { return [
        { type: ModalService, decorators: [{ type: Inject, args: [ModalService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
        { type: AccountCredentialsService, decorators: [{ type: Inject, args: [AccountCredentialsService,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
        { type: ReducerManagerDispatcher, decorators: [{ type: Inject, args: [ReducerManagerDispatcher,] },] },
    ]; };
    return TeleportDevPortalProfileBasicAuthComponent;
}());
export { TeleportDevPortalProfileBasicAuthComponent };
//# sourceMappingURL=profile.basic-auth.component.js.map