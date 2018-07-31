import { ElementRef, Renderer2, AfterViewInit } from "@angular/core";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
export declare class AllowAccessDirective implements AfterViewInit {
    private el;
    private renderer;
    private store$;
    private allowAccess;
    constructor(el: ElementRef, renderer: Renderer2, store$: Store<TeleportCoreState>);
    ngAfterViewInit(): void;
}
