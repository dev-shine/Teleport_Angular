import { OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import { AccountService } from "teleport-module-services/services/v1/services/account/account.service";
import { MessageService } from "../../services/message.service";
export declare class TeleportDevPortalRegisterComponent implements OnInit, OnDestroy {
    private account;
    private messages;
    form: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        passwordVerify: string;
        phoneNo: string;
        company: string;
        interests: {};
        tc_agree: boolean;
        "g-recaptcha-response": string;
    };
    isSubmitted: boolean;
    isSuccess: boolean;
    isCaptchaOk: boolean;
    private _resetCaptchaObservable;
    private _resetCaptchaObserver;
    constructor(account: AccountService, messages: MessageService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    isPasswordValid(pw: string): boolean;
    isEmailValid(email: string): boolean;
    passwordsMatch(): boolean;
    onCaptcha(token: string, val: boolean): void;
    resetCaptchaObservable(): Observable<boolean>;
    onSubmit(): void;
}
