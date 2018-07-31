import { NgModule } from '@angular/core';
import { PortalModule } from './portal/portal-directives';
import { OverlayModule } from './overlay/overlay-directives';
export { Portal, BasePortalHost, ComponentPortal, TemplatePortal } from './portal/portal';
export { PortalHostDirective, TemplatePortalDirective, PortalModule, } from './portal/portal-directives';
export { DomPortalHost } from './portal/dom-portal-host';
export { Overlay, OVERLAY_PROVIDERS } from './overlay/overlay';
export { OverlayContainer } from './overlay/overlay-container';
export { OverlayRef } from './overlay/overlay-ref';
export { OverlayState } from './overlay/overlay-state';
export { ConnectedOverlayDirective, OverlayOrigin, OverlayModule, } from './overlay/overlay-directives';
export * from './overlay/position/connected-position-strategy';
export * from './overlay/position/connected-position';
export { applyCssTransform } from './style/apply-transform';
export { MdError } from './errors/error';
export { BooleanFieldValue } from './annotations/field-value';
export * from './keyboard/keycodes';
var MdCoreModule = (function () {
    function MdCoreModule() {
    }
    MdCoreModule.forRoot = function () {
        return {
            ngModule: MdCoreModule,
            providers: []
        };
    };
    MdCoreModule.decorators = [
        { type: NgModule, args: [{
                    imports: [PortalModule, OverlayModule],
                    exports: [PortalModule, OverlayModule],
                },] },
    ];
    MdCoreModule.ctorParameters = function () { return []; };
    return MdCoreModule;
}());
export { MdCoreModule };
//# sourceMappingURL=core.js.map