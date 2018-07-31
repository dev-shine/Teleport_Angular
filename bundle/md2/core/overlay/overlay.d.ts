import { ComponentFactoryResolver } from '@angular/core';
import { OverlayState } from './overlay-state';
import { OverlayRef } from './overlay-ref';
import { OverlayPositionBuilder } from './position/overlay-position-builder';
import { ViewportRuler } from './position/viewport-ruler';
import { OverlayContainer } from './overlay-container';
export declare class Overlay {
    private _overlayContainer;
    private _componentFactoryResolver;
    private _positionBuilder;
    constructor(_overlayContainer: OverlayContainer, _componentFactoryResolver: ComponentFactoryResolver, _positionBuilder: OverlayPositionBuilder);
    create(state?: OverlayState): OverlayRef;
    position(): OverlayPositionBuilder;
    private _createPaneElement();
    private _createPortalHost(pane);
    private _createOverlayRef(pane, state);
}
export declare const OVERLAY_PROVIDERS: (typeof ViewportRuler | typeof OverlayPositionBuilder | typeof Overlay | typeof OverlayContainer)[];
