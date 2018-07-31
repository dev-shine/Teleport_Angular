import "../vendor-js/google-recaptcha-api";
import { EventEmitter, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
export declare class TeleportReCaptchaComponent implements AfterViewInit, OnDestroy {
    renderDiv: ElementRef;
    sitekey: string;
    theme: string;
    onReset: Observable<boolean>;
    callback: EventEmitter<{}>;
    expiredCallback: EventEmitter<{}>;
    private subscription;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
