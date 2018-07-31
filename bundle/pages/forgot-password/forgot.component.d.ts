import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import { LoginService } from "teleport-module-services/services/services/login/login.service";
import { MessageService } from "../../services/message.service";
import { TeleportLoaderService } from "teleport-module-loader";
export declare class TeleportDevPortalForgotPasswordComponent {
    private router;
    private logins;
    private messages;
    private loader;
    userName: string;
    isCaptchaOk: boolean;
    private reCaptchaResponse;
    private _resetCaptchaObservable;
    private _resetCaptchaObserver;
    constructor(router: Router, logins: LoginService, messages: MessageService, loader: TeleportLoaderService);
    isEmailValid(email: string): boolean;
    onCaptcha(resp: string, isOk: boolean): void;
    resetCaptchaObservable(): Observable<boolean>;
    onRecoverPassword(): void;
}
