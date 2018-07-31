var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { NgModule, Directive, TemplateRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { TemplatePortal, BasePortalHost } from './portal';
var TemplatePortalDirective = (function (_super) {
    __extends(TemplatePortalDirective, _super);
    function TemplatePortalDirective(templateRef, viewContainerRef) {
        return _super.call(this, templateRef, viewContainerRef) || this;
    }
    TemplatePortalDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[portal]',
                    exportAs: 'portal',
                },] },
    ];
    TemplatePortalDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: ViewContainerRef, },
    ]; };
    return TemplatePortalDirective;
}(TemplatePortal));
export { TemplatePortalDirective };
var PortalHostDirective = (function (_super) {
    __extends(PortalHostDirective, _super);
    function PortalHostDirective(_componentFactoryResolver, _viewContainerRef) {
        var _this = _super.call(this) || this;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._viewContainerRef = _viewContainerRef;
        return _this;
    }
    Object.defineProperty(PortalHostDirective.prototype, "portal", {
        get: function () {
            return this._portal;
        },
        set: function (p) {
            this._replaceAttachedPortal(p);
        },
        enumerable: true,
        configurable: true
    });
    PortalHostDirective.prototype.attachComponentPortal = function (portal) {
        portal.setAttachedHost(this);
        var viewContainerRef = portal.viewContainerRef != null ?
            portal.viewContainerRef :
            this._viewContainerRef;
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        var ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.parentInjector);
        this.setDisposeFn(function () { return ref.destroy(); });
        return ref;
    };
    PortalHostDirective.prototype.attachTemplatePortal = function (portal) {
        var _this = this;
        portal.setAttachedHost(this);
        this._viewContainerRef.createEmbeddedView(portal.templateRef);
        this.setDisposeFn(function () { return _this._viewContainerRef.clear(); });
        return new Map();
    };
    PortalHostDirective.prototype._replaceAttachedPortal = function (p) {
        if (this.hasAttached()) {
            this.detach();
        }
        if (p) {
            this.attach(p);
            this._portal = p;
        }
    };
    PortalHostDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[portalHost]',
                    inputs: ['portal: portalHost']
                },] },
    ];
    PortalHostDirective.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
        { type: ViewContainerRef, },
    ]; };
    return PortalHostDirective;
}(BasePortalHost));
export { PortalHostDirective };
var PortalModule = (function () {
    function PortalModule() {
    }
    PortalModule.forRoot = function () {
        return {
            ngModule: PortalModule,
            providers: []
        };
    };
    PortalModule.decorators = [
        { type: NgModule, args: [{
                    exports: [TemplatePortalDirective, PortalHostDirective],
                    declarations: [TemplatePortalDirective, PortalHostDirective],
                },] },
    ];
    PortalModule.ctorParameters = function () { return []; };
    return PortalModule;
}());
export { PortalModule };
//# sourceMappingURL=portal-directives.js.map