
import "../vendor-js/google-recaptcha-api";

import {
    Component, Input, Output, EventEmitter,
    ViewChild, ElementRef, AfterViewInit, OnDestroy,
} from "@angular/core";

import { Observable }   from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

declare const window: any;


@Component({
    selector: "teleport-sp-recaptcha",
    template: `<div #renderDiv class="g-recaptcha"></div>`,
})
export class TeleportReCaptchaComponent implements AfterViewInit, OnDestroy {

    @ViewChild("renderDiv") public renderDiv: ElementRef;

    @Input() public sitekey: string;
    @Input() public theme: string;
    
    @Input() public onReset: Observable<boolean>;

    @Output() public callback = new EventEmitter();
    @Output() public expiredCallback = new EventEmitter();

    private subscription: Subscription;


    public ngAfterViewInit () {

        if (window.location.search.indexOf("use-automated-testing-helpers") !== -1) {

            this.callback.emit("use-automated-testing-helpers");

        } else if (window.grecaptcha === undefined) {

            setTimeout(() => this.ngAfterViewInit(), 200);

        } else {

            let id = `recaptcha-${Math.random().toString(36).substr(2)}`;

            this.renderDiv.nativeElement.id = id;

            let widgetId = window.grecaptcha.render(id, {
                sitekey            : this.sitekey,
                theme              : this.theme || "light",
                callback           : (evt: any) => this.callback.emit(evt),
                "expired-callback" : (evt: any) => this.expiredCallback.emit(evt),
            });

            if (this.onReset) {
                this.subscription = this.onReset.subscribe(() => window.grecaptcha.reset(widgetId));
            }
        }
    }


    public ngOnDestroy () {
        
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
