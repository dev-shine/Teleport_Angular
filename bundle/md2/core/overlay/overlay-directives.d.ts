import { ModuleWithProviders, TemplateRef, ViewContainerRef, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Overlay } from './overlay';
import { OverlayRef } from './overlay-ref';
import { ConnectionPositionPair } from './position/connected-position';
export declare class OverlayOrigin {
    private _elementRef;
    constructor(_elementRef: ElementRef);
    readonly elementRef: ElementRef;
}
export declare class ConnectedOverlayDirective implements OnInit, OnDestroy {
    private _overlay;
    private _overlayRef;
    private _templatePortal;
    origin: OverlayOrigin;
    positions: ConnectionPositionPair[];
    constructor(_overlay: Overlay, templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef);
    readonly overlayRef: OverlayRef;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private _createOverlay();
    private _destroyOverlay();
}
export declare class OverlayModule {
    static forRoot(): ModuleWithProviders;
}
