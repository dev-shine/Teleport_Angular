import { ViewportRuler } from './viewport-ruler';
import { ConnectedPositionStrategy } from './connected-position-strategy';
import { ElementRef } from '@angular/core';
import { GlobalPositionStrategy } from './global-position-strategy';
import { OverlayConnectionPosition, OriginConnectionPosition } from './connected-position';
export declare class OverlayPositionBuilder {
    private _viewportRuler;
    constructor(_viewportRuler: ViewportRuler);
    global(): GlobalPositionStrategy;
    connectedTo(elementRef: ElementRef, originPos: OriginConnectionPosition, overlayPos: OverlayConnectionPosition): ConnectedPositionStrategy;
}
