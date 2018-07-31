import { ModuleWithProviders, ComponentRef, TemplateRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Portal, TemplatePortal, ComponentPortal, BasePortalHost } from './portal';
export declare class TemplatePortalDirective extends TemplatePortal {
    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef);
}
export declare class PortalHostDirective extends BasePortalHost {
    private _componentFactoryResolver;
    private _viewContainerRef;
    private _portal;
    constructor(_componentFactoryResolver: ComponentFactoryResolver, _viewContainerRef: ViewContainerRef);
    portal: Portal<any>;
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    attachTemplatePortal(portal: TemplatePortal): Map<string, any>;
    private _replaceAttachedPortal(p);
}
export declare class PortalModule {
    static forRoot(): ModuleWithProviders;
}
