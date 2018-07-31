import { NgModule, Directive, TemplateRef, ViewContainerRef, Input, ElementRef } from '@angular/core';
import { Overlay, OVERLAY_PROVIDERS } from './overlay';
import { TemplatePortal } from '../portal/portal';
import { OverlayState } from './overlay-state';
import { ConnectionPositionPair } from './position/connected-position';
import { PortalModule } from '../portal/portal-directives';
var defaultPositionList = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
];
var OverlayOrigin = (function () {
    function OverlayOrigin(_elementRef) {
        this._elementRef = _elementRef;
    }
    Object.defineProperty(OverlayOrigin.prototype, "elementRef", {
        get: function () {
            return this._elementRef;
        },
        enumerable: true,
        configurable: true
    });
    OverlayOrigin.decorators = [
        { type: Directive, args: [{
                    selector: '[overlay-origin]',
                    exportAs: 'overlayOrigin',
                },] },
    ];
    OverlayOrigin.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    return OverlayOrigin;
}());
export { OverlayOrigin };
var ConnectedOverlayDirective = (function () {
    function ConnectedOverlayDirective(_overlay, templateRef, viewContainerRef) {
        this._overlay = _overlay;
        this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
    }
    Object.defineProperty(ConnectedOverlayDirective.prototype, "overlayRef", {
        get: function () {
            return this._overlayRef;
        },
        enumerable: true,
        configurable: true
    });
    ConnectedOverlayDirective.prototype.ngOnInit = function () {
        this._createOverlay();
    };
    ConnectedOverlayDirective.prototype.ngOnDestroy = function () {
        this._destroyOverlay();
    };
    ConnectedOverlayDirective.prototype._createOverlay = function () {
        if (!this.positions || !this.positions.length) {
            this.positions = defaultPositionList;
        }
        var overlayConfig = new OverlayState();
        overlayConfig.positionStrategy =
            this._overlay.position().connectedTo(this.origin.elementRef, { originX: this.positions[0].overlayX, originY: this.positions[0].originY }, { overlayX: this.positions[0].overlayX, overlayY: this.positions[0].overlayY });
        this._overlayRef = this._overlay.create(overlayConfig);
        this._overlayRef.attach(this._templatePortal);
    };
    ConnectedOverlayDirective.prototype._destroyOverlay = function () {
        this._overlayRef.dispose();
    };
    ConnectedOverlayDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[connected-overlay]'
                },] },
    ];
    ConnectedOverlayDirective.ctorParameters = function () { return [
        { type: Overlay, },
        { type: TemplateRef, },
        { type: ViewContainerRef, },
    ]; };
    ConnectedOverlayDirective.propDecorators = {
        'origin': [{ type: Input },],
        'positions': [{ type: Input },],
    };
    return ConnectedOverlayDirective;
}());
export { ConnectedOverlayDirective };
var OverlayModule = (function () {
    function OverlayModule() {
    }
    OverlayModule.forRoot = function () {
        return {
            ngModule: OverlayModule,
            providers: OVERLAY_PROVIDERS,
        };
    };
    OverlayModule.decorators = [
        { type: NgModule, args: [{
                    imports: [PortalModule],
                    exports: [ConnectedOverlayDirective, OverlayOrigin],
                    declarations: [ConnectedOverlayDirective, OverlayOrigin],
                },] },
    ];
    OverlayModule.ctorParameters = function () { return []; };
    return OverlayModule;
}());
export { OverlayModule };
//# sourceMappingURL=overlay-directives.js.map