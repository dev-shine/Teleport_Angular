import { Component, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { Store } from "@ngrx/store";
import { IntegrationsWatsonService } from "../../../../services/integrations.watson.service";
import { ModalService } from "../../../../services/modal.service";
import { MessageService } from "../../../../services/message.service";
import { TeleportLoaderService } from "teleport-module-loader";
var TeleportDevPortalAppIntegrationWatsonComponent = (function () {
    function TeleportDevPortalAppIntegrationWatsonComponent(route, watson, modal, message, store$, loader) {
        var _this = this;
        this.route = route;
        this.watson = watson;
        this.modal = modal;
        this.message = message;
        this.store$ = store$;
        this.loader = loader;
        this.isEditing = false;
        this.username = "";
        this.password = "";
        this.loader.show("Loading your IBM Watson settings...");
        this.route.params
            .filter(function (param) { return !!param.appId; })
            .forEach(function (param) {
            Promise.all([
                _this.store$.select("v1_applications").first().map(function (apps) { return apps.find(function (app) { return app.name === param.appId; }); }).toPromise(),
                _this.watson.getTextToSpeech(param.appId),
            ])
                .then(function (r) {
                _this._application = r[0];
                _this._watson = r[1];
                _this.cancel();
            })
                .catch(function (err) {
                _this.message.error("Watson Credentials Failure", err.message, err);
            });
        })
            .catch(function (err) { return console.error(err); });
    }
    TeleportDevPortalAppIntegrationWatsonComponent.prototype.ngOnDestroy = function () {
        delete this._application;
        delete this._watson;
        this.loader.hide();
        this.isEditing = false;
        this.username = "";
        this.password = "";
    };
    Object.defineProperty(TeleportDevPortalAppIntegrationWatsonComponent.prototype, "App", {
        get: function () {
            return this._application;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeleportDevPortalAppIntegrationWatsonComponent.prototype, "Watson", {
        get: function () {
            return this._watson;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalAppIntegrationWatsonComponent.prototype.edit = function () {
        this.isEditing = true;
        this.username = this._watson && this._watson.textToSpeech && this._watson.textToSpeech.username || "";
        this.password = "";
    };
    TeleportDevPortalAppIntegrationWatsonComponent.prototype.clear = function () {
        var _this = this;
        this.modal.show("Delete Watson Settings", "<p>Clicking OK will delete your Watson settings.</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (result) {
            if (result) {
                _this.loader.show("Deleting your IBM Watson settings...");
                _this.watson.deleteTextToSpeech(_this.App.name)
                    .then(function (r) {
                    _this._watson = r;
                    _this.cancel();
                })
                    .catch(function (err) {
                    _this.cancel();
                    _this.message.error("Update Failure", err.message, err);
                });
            }
        });
    };
    TeleportDevPortalAppIntegrationWatsonComponent.prototype.save = function () {
        var _this = this;
        this.isEditing = false;
        this.loader.show("Saving your IBM Watson settings...");
        var newWatson = {
            textToSpeech: {
                username: this.username,
                password: this.password,
            },
        };
        this.watson.putTextToSpeech(this.App.name, newWatson)
            .then(function (r) {
            _this._watson = r;
            _this.cancel();
        })
            .catch(function (err) {
            _this.cancel();
            _this.message.error("Update Failure", err.message, err);
        });
    };
    TeleportDevPortalAppIntegrationWatsonComponent.prototype.cancel = function () {
        this.loader.hide();
        this.isEditing = false;
        this.username = this._watson && this._watson.textToSpeech && this._watson.textToSpeech.username || "";
        this.password = this._watson.textToSpeech.password ? "**********" : "";
    };
    TeleportDevPortalAppIntegrationWatsonComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-app-integrations-watson",
                    templateUrl: "apps.integrations.watson.html",
                },] },
    ];
    TeleportDevPortalAppIntegrationWatsonComponent.ctorParameters = function () { return [
        { type: ActivatedRoute, decorators: [{ type: Inject, args: [ActivatedRoute,] },] },
        { type: IntegrationsWatsonService, decorators: [{ type: Inject, args: [IntegrationsWatsonService,] },] },
        { type: ModalService, decorators: [{ type: Inject, args: [ModalService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
        { type: TeleportLoaderService, decorators: [{ type: Inject, args: [TeleportLoaderService,] },] },
    ]; };
    return TeleportDevPortalAppIntegrationWatsonComponent;
}());
export { TeleportDevPortalAppIntegrationWatsonComponent };
//# sourceMappingURL=apps.integrations.watson.component.js.map