import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute }                       from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Observer }   from "rxjs/Observer";
import "rxjs/add/operator/toPromise";

import { LoginService } from "teleport-module-services/services/services/login/login.service";
import * as i from "teleport-module-services/services/services/login/login.service.interface";

import { MessageService } from "../../services/message.service";

import PasswordUtil       from "../../utils/PasswordUtil";
import { EmailValidator } from "../../utils/EmailValidator";

import { TeleportLoaderService } from "teleport-module-loader";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-recover-password",
    templateUrl: "recover.html",
    // styleUrls  : [ "../css/bootswatch.min.css", "../css/main.min.css" ],
})
export class TeleportDevPortalRecoverPasswordComponent implements OnInit, OnDestroy {

    public isSuccess = false;
    public email = "";
    public newPassword = "";
    public newPasswordVerify = "";
    public isCaptchaOk = false;

    private reCaptchaResponse = "";

    private _resetCaptchaObservable: Observable<boolean>;
    private _resetCaptchaObserver: Observer<boolean>;

    constructor (
        @Inject(ActivatedRoute)        private route: ActivatedRoute,
        @Inject(LoginService)          private logins: LoginService,
        @Inject(MessageService)        private messages: MessageService,
        @Inject(TeleportLoaderService) private loader: TeleportLoaderService,        
    ) {}

    public ngOnInit () {
        this._resetCaptchaObservable = Observable.create((observer: Observer<boolean>) => this._resetCaptchaObserver = observer);
    }

    public ngOnDestroy () {
        if (this._resetCaptchaObserver) {
            this._resetCaptchaObserver.complete();
        }
    }


    public isPasswordValid (pw: string): boolean {
        return PasswordUtil.satisfies(pw);
    }

    public isEmailValid (email: string): boolean {
        return EmailValidator.isValid(email);
    }

    public passwordsMatch () {
        return this.newPassword === this.newPasswordVerify;
    }


    public onCaptcha (token: string, val: boolean) {
        this.reCaptchaResponse = token;
        this.isCaptchaOk = val;
    }

    public resetCaptchaObservable (): Observable<boolean> {
        return this._resetCaptchaObservable;
    }


    public onSubmit () {

        if (! this.newPassword || ! this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "You must enter your new password twice.");
            return;
        }

        if (this.newPassword !== this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "The passwords do not match.");
            return;
        }

        if (! PasswordUtil.satisfies(this.newPassword)) {
            this.messages.warning("Invalid Password", "Your password must be at least 8 characters and contain caps, lowercase, numbers and special characters.");
            return;
        }

        this.loader.show("Please wait...");

        const authKey = (this.route.snapshot.params as any).key;

        this.logins.resetPassword({ email: this.email, password: this.newPassword, authKey, reCaptchaResponse: this.reCaptchaResponse })
            .toPromise()
            .then(() => {
                this.isSuccess = true;
                this.loader.hide();
            })
            .catch(err => {
                console.error("Recovery failure.", err);
                this.isSuccess = false;
                this.loader.hide();
                this._resetCaptchaObserver.next(true);
                this.messages.error("Recovery Failed", err.message, err);
            });
    }
}
