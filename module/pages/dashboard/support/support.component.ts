import { Component, Inject, OnInit }     from "@angular/core";
import { Http, RequestOptions, Headers } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";

import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";

import { APIv1State }   from "teleport-module-services/services/v1/ngrx/index";
import { IApplication } from "teleport-module-services/services/v1/models/Application";
import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";

import { MessageService }     from "../../../services/message.service";

import { EmailValidator } from "../../../utils/EmailValidator";

declare const API_BASE_URL: string;


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-support-form",
    templateUrl: "support.html",
})
export class TeleportDevPortalSupportFormComponent implements OnInit {

    public form = {
        account: "",
        app: "N/A",
        name: "",
        email: "",
        phone: "",
        topic: "bug_report",
        priority: "normal",
        description: "",
    };

    public Applications: IApplication[] = [];
    
    public isSubmitted = false;
    public isSuccess = false;

    
    constructor (
        @Inject(Http)           private http: Http,
        @Inject(MessageService) private messages: MessageService,
        @Inject(Store)          private store$: Store<TeleportCoreState & APIv1State>,
    ) {}

    public ngOnInit () {

        this.isSubmitted = false;
        this.isSuccess = false;

        this.store$.select("session")
            .first(s => s.isJust())
            .map(s => s.just())
            .subscribe((s: ILoginAsResponse<IDeveloper>) => {
                this.form.account = s.userData.id;
                this.form.name = `${s.userData.firstName} ${s.userData.lastName}`;
                this.form.email = s.userData.email;
                this.form.phone = s.userData.phone || "";
            });

        this.store$.select("v1_applications")
            .first()
            .subscribe(a => this.Applications = a);
    }

    public isEmailValid (email: string): boolean {
        return EmailValidator.isValid(email);
    }

    public onSubmit () {

        this.isSubmitted = true;

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers, withCredentials: true });

        this.http
            .post(`${API_BASE_URL}/support`, JSON.stringify(this.form), options)
            .catch(err => Observable.throw(new Error(err.json().user_message)))
            .toPromise()
            .then(() => {
                this.isSuccess = true;
                this.isSubmitted = false;
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
                this.messages.info("Support Request Delivered", "We will respond as soon as possible.");
            })
            .catch(err => {
                this.isSuccess = false;
                this.isSubmitted = false;
                this.messages.error("Registration Failed", err.message, err);
            });
    }
}
