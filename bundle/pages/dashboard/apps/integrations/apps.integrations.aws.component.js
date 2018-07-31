import { Component, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { Store } from "@ngrx/store";
import { IntegrationsAWSService } from "../../../../services/integrations.aws.service";
import { ModalService } from "../../../../services/modal.service";
import { MessageService } from "../../../../services/message.service";
import { TeleportLoaderService } from "teleport-module-loader";
var TeleportDevPortalAppIntegrationAwsComponent = (function () {
    function TeleportDevPortalAppIntegrationAwsComponent(route, aws, modal, message, store$, loader) {
        var _this = this;
        this.route = route;
        this.aws = aws;
        this.modal = modal;
        this.message = message;
        this.store$ = store$;
        this.loader = loader;
        this.isEditing = false;
        this.accessKey = "";
        this.securityKey = "";
        this.bucket = "";
        this.region = "";
        this.loader.show("Loading your AWS info...");
        this.route.params
            .filter(function (param) { return !!param.appId; })
            .forEach(function (param) {
            Promise.all([
                _this.store$.select("v1_applications").first().map(function (apps) { return apps.find(function (app) { return app.name === param.appId; }); }).toPromise(),
                _this.aws.getAWS(param.appId),
            ])
                .then(function (r) {
                _this._application = r[0];
                _this._aws = r[1];
                _this.cancel();
            })
                .catch(function (err) {
                _this.message.error("AWS Credentials Failure", err.message, err);
                _this.cancel();
            });
        })
            .catch(function (err) { return console.error(err); });
    }
    TeleportDevPortalAppIntegrationAwsComponent.prototype.ngOnDestroy = function () {
        delete this._application;
        delete this._aws;
        this.loader.hide();
        this.isEditing = false;
        this.accessKey = "";
        this.securityKey = "";
        this.bucket = "";
        this.region = "";
    };
    Object.defineProperty(TeleportDevPortalAppIntegrationAwsComponent.prototype, "App", {
        get: function () {
            return this._application;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TeleportDevPortalAppIntegrationAwsComponent.prototype, "AWS", {
        get: function () {
            return this._aws;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalAppIntegrationAwsComponent.prototype.edit = function () {
        this.isEditing = true;
        this.accessKey = this._aws && this._aws.accessKey || "";
        this.securityKey = "";
        this.bucket = this._aws && this._aws.s3.bucket || "";
        this.region = this._aws && this._aws.s3.region || "";
    };
    TeleportDevPortalAppIntegrationAwsComponent.prototype.clear = function () {
        var _this = this;
        this.modal.show("Delete AWS Settings", "<p>Clicking OK will delete your AWS settings.</p><p>Are you sure?</p>", { type: "confirm" })
            .then(function (result) {
            if (result) {
                _this.loader.show("Deleting your AWS settings...");
                _this.aws.deleteAWS(_this.App.name)
                    .then(function (r) {
                    _this._aws = r;
                    _this.cancel();
                })
                    .catch(function (err) {
                    _this.cancel();
                    _this.message.error("Update Failure", err.message, err);
                });
            }
        });
    };
    TeleportDevPortalAppIntegrationAwsComponent.prototype.save = function () {
        var _this = this;
        this.isEditing = false;
        this.loader.show("Saving your AWS settings...");
        var newAWS = {
            accessKey: this.accessKey,
            securityKey: this.securityKey,
            s3: {
                bucket: this.bucket,
                region: this.region,
            },
        };
        this.aws.putAWS(this.App.name, newAWS)
            .then(function (r) {
            _this._aws = r;
            _this.cancel();
        })
            .catch(function (err) {
            _this.cancel();
            _this.message.error("Update Failure", err.message, err);
        });
    };
    TeleportDevPortalAppIntegrationAwsComponent.prototype.cancel = function () {
        this.loader.hide();
        this.isEditing = false;
        this.accessKey = this._aws && this._aws.accessKey || "";
        this.securityKey = this._aws.securityKey ? "**********" : "";
        this.bucket = this._aws && this._aws.s3.bucket || "";
        this.region = this._aws && this._aws.s3.region || "";
    };
    TeleportDevPortalAppIntegrationAwsComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-app-integrations-aws",
                    templateUrl: "apps.integrations.aws.html",
                },] },
    ];
    TeleportDevPortalAppIntegrationAwsComponent.ctorParameters = function () { return [
        { type: ActivatedRoute, decorators: [{ type: Inject, args: [ActivatedRoute,] },] },
        { type: IntegrationsAWSService, decorators: [{ type: Inject, args: [IntegrationsAWSService,] },] },
        { type: ModalService, decorators: [{ type: Inject, args: [ModalService,] },] },
        { type: MessageService, decorators: [{ type: Inject, args: [MessageService,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
        { type: TeleportLoaderService, decorators: [{ type: Inject, args: [TeleportLoaderService,] },] },
    ]; };
    return TeleportDevPortalAppIntegrationAwsComponent;
}());
export { TeleportDevPortalAppIntegrationAwsComponent };
//# sourceMappingURL=apps.integrations.aws.component.js.map