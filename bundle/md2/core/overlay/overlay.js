import { ComponentFactoryResolver, Injectable, } from '@angular/core';
import { OverlayState } from './overlay-state';
import { DomPortalHost } from '../portal/dom-portal-host';
import { OverlayRef } from './overlay-ref';
import { OverlayPositionBuilder } from './position/overlay-position-builder';
import { ViewportRuler } from './position/viewport-ruler';
import { OverlayContainer } from './overlay-container';
var nextUniqueId = 0;
var defaultState = new OverlayState();
var Overlay = (function () {
    function Overlay(_overlayContainer, _componentFactoryResolver, _positionBuilder) {
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._positionBuilder = _positionBuilder;
    }
    Overlay.prototype.create = function (state) {
        if (state === void 0) { state = defaultState; }
        return this._createOverlayRef(this._createPaneElement(), state);
    };
    Overlay.prototype.position = function () {
        return this._positionBuilder;
    };
    Overlay.prototype._createPaneElement = function () {
        var pane = document.createElement('div');
        pane.id = "md-overlay-" + nextUniqueId++;
        pane.classList.add('md-overlay-pane');
        this._overlayContainer.getContainerElement().appendChild(pane);
        return pane;
    };
    Overlay.prototype._createPortalHost = function (pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver);
    };
    Overlay.prototype._createOverlayRef = function (pane, state) {
        return new OverlayRef(this._createPortalHost(pane), pane, state);
    };
    Overlay.decorators = [
        { type: Injectable },
    ];
    Overlay.ctorParameters = function () { return [
        { type: OverlayContainer, },
        { type: ComponentFactoryResolver, },
        { type: OverlayPositionBuilder, },
    ]; };
    return Overlay;
}());
export { Overlay };
export var OVERLAY_PROVIDERS = [
    ViewportRuler,
    OverlayPositionBuilder,
    Overlay,
    OverlayContainer,
];
//# sourceMappingURL=overlay.js.map