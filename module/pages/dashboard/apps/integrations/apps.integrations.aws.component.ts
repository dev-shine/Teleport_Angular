import { Component, Inject, OnDestroy } from "@angular/core";
import { ActivatedRoute }               from "@angular/router";

import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";

import { APIv1State }   from "teleport-module-services/services/v1/ngrx/index";
import { IApplication } from "teleport-module-services/services/v1/models/Application";

import { IAWSPutRequest, IntegrationsAWSService } from "../../../../services/integrations.aws.service";
import { IAWS }           from "../../../../models/interfaces";
import { ModalService }   from "../../../../services/modal.service";
import { MessageService } from "../../../../services/message.service";

import { TeleportLoaderService } from "teleport-module-loader";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-app-integrations-aws",
    templateUrl: "apps.integrations.aws.html",
})
export class TeleportDevPortalAppIntegrationAwsComponent implements OnDestroy {

    public isEditing = false;

    public accessKey = "";
    public securityKey = "";
    public bucket = "";
    public region = "";

    private _application: IApplication;
    private _aws: IAWS;


    constructor (
        @Inject(ActivatedRoute)         private route: ActivatedRoute,
        @Inject(IntegrationsAWSService) private aws: IntegrationsAWSService,
        @Inject(ModalService)           private modal: ModalService,
        @Inject(MessageService)         private message: MessageService,
        @Inject(Store)                  private store$: Store<TeleportCoreState & APIv1State>,
        @Inject(TeleportLoaderService)  private loader: TeleportLoaderService,
    ) {
        this.loader.show("Loading your AWS info...");

        this.route.params
            .filter((param: any) => !!param.appId)
            .forEach((param: any) => {

                Promise.all([
                    this.store$.select("v1_applications").first().map(apps => apps.find(app => app.name === param.appId)).toPromise(),
                    this.aws.getAWS(param.appId),
                ])
                .then((r: [IApplication, IAWS]) => {
                    this._application = r[0];
                    this._aws = r[1];
                    this.cancel();
                })
                .catch(err => {
                    this.message.error("AWS Credentials Failure", err.message, err);
                    this.cancel();
                });
            })
            .catch(err => console.error(err));
    }

    public ngOnDestroy () {
        delete this._application;
        delete this._aws;
        this.loader.hide();
        this.isEditing = false;
        this.accessKey = "";
        this.securityKey = "";
        this.bucket = "";
        this.region = "";
    }


    public get App () {
        return this._application;
    }

    public get AWS () {
        return this._aws;
    }


    public edit () {
        this.isEditing = true;
        this.accessKey = this._aws && this._aws.accessKey || "";
        this.securityKey = "";
        this.bucket = this._aws && this._aws.s3.bucket || "";
        this.region = this._aws && this._aws.s3.region || "";
    }


    public clear () {

        this.modal.show("Delete AWS Settings", `<p>Clicking OK will delete your AWS settings.</p><p>Are you sure?</p>`, { type: "confirm" })
            .then(result => {
                if (result) {
                    this.loader.show("Deleting your AWS settings...");
                    this.aws.deleteAWS(this.App.name)
                        .then((r: IAWS) => {
                            this._aws = r;
                            this.cancel();
                        })
                        .catch(err => {
                            this.cancel();
                            this.message.error("Update Failure", err.message, err);
                        });
                }
            });
    }


    public save () {

        this.isEditing = false;
        this.loader.show("Saving your AWS settings...");

        const newAWS: IAWSPutRequest = {
            accessKey  : this.accessKey,
            securityKey: this.securityKey,
            s3: {
                bucket: this.bucket,
                region: this.region,
            },
        };

        this.aws.putAWS(this.App.name, newAWS)
            .then((r: IAWS) => {
                this._aws = r;
                this.cancel();
            })
            .catch(err => {
                this.cancel();
                this.message.error("Update Failure", err.message, err);
            });
    }


    public cancel () {
        this.loader.hide();
        this.isEditing = false;
        this.accessKey = this._aws && this._aws.accessKey || "";
        this.securityKey = this._aws.securityKey ? "**********" : "";
        this.bucket = this._aws && this._aws.s3.bucket || "";
        this.region = this._aws && this._aws.s3.region || "";
    }
}
