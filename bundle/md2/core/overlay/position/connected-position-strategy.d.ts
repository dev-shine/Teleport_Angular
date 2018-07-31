import { PositionStrategy } from './position-strategy';
import { ElementRef } from '@angular/core';
import { ViewportRuler } from './viewport-ruler';
import { ConnectionPositionPair, OriginConnectionPosition, OverlayConnectionPosition } from './connected-position';
export declare class ConnectedPositionStrategy implements PositionStrategy {
    private _connectedTo;
    private _originPos;
    private _overlayPos;
    private _viewportRuler;
    _isRtl: boolean;
    _preferredPositions: ConnectionPositionPair[];
    private _origin;
    constructor(_connectedTo: ElementRef, _originPos: OriginConnectionPosition, _overlayPos: OverlayConnectionPosition, _viewportRuler: ViewportRuler);
    readonly positions: ConnectionPositionPair[];
    apply(element: HTMLElement): Promise<void>;
    withFallbackPosition(originPos: OriginConnectionPosition, overlayPos: OverlayConnectionPosition): this;
    private _getStartX(rect);
    private _getEndX(rect);
    private _getOriginConnectionPoint(originRect, pos);
    private _getOverlayPoint(originPoint, overlayRect, pos);
    private _willOverlayFitWithinViewport(overlayPoint, overlayRect, viewportRect);
    private _setElementPosition(element, overlayPoint);
}
