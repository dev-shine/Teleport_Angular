import { ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { BasePortalHost, ComponentPortal, TemplatePortal } from './portal';
export declare class DomPortalHost extends BasePortalHost {
    private _hostDomElement;
    private _componentFactoryResolver;
    constructor(_hostDomElement: Element, _componentFactoryResolver: ComponentFactoryResolver);
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    attachTemplatePortal(portal: TemplatePortal): Map<string, any>;
    dispose(): void;
}
