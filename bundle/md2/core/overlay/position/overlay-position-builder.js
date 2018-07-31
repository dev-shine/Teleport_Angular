import { ViewportRuler } from './viewport-ruler';
import { ConnectedPositionStrategy } from './connected-position-strategy';
import { Injectable } from '@angular/core';
import { GlobalPositionStrategy } from './global-position-strategy';
var OverlayPositionBuilder = (function () {
    function OverlayPositionBuilder(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
    }
    OverlayPositionBuilder.prototype.global = function () {
        return new GlobalPositionStrategy();
    };
    OverlayPositionBuilder.prototype.connectedTo = function (elementRef, originPos, overlayPos) {
        return new ConnectedPositionStrategy(elementRef, originPos, overlayPos, this._viewportRuler);
    };
    OverlayPositionBuilder.decorators = [
        { type: Injectable },
    ];
    OverlayPositionBuilder.ctorParameters = function () { return [
        { type: ViewportRuler, },
    ]; };
    return OverlayPositionBuilder;
}());
export { OverlayPositionBuilder };
//# sourceMappingURL=overlay-position-builder.js.map