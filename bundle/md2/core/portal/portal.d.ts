import { TemplateRef, ViewContainerRef, ElementRef, ComponentRef, Injector } from '@angular/core';
import { ComponentType } from '../overlay/generic-component-type';
export declare abstract class Portal<T> {
    private _attachedHost;
    attach(host: PortalHost): T;
    detach(): void;
    readonly isAttached: boolean;
    setAttachedHost(host: PortalHost): void;
}
export declare class ComponentPortal<T> extends Portal<ComponentRef<T>> {
    component: ComponentType<T>;
    viewContainerRef: ViewContainerRef;
    injector: Injector;
    constructor(component: ComponentType<T>, viewContainerRef?: ViewContainerRef, injector?: Injector);
}
export declare class TemplatePortal extends Portal<Map<string, any>> {
    templateRef: TemplateRef<any>;
    viewContainerRef: ViewContainerRef;
    locals: Map<string, any>;
    constructor(template: TemplateRef<any>, viewContainerRef: ViewContainerRef);
    readonly origin: ElementRef;
    attach(host: PortalHost, locals?: Map<string, any>): Map<string, any>;
    detach(): void;
}
export interface PortalHost {
    attach(portal: Portal<any>): any;
    detach(): any;
    dispose(): void;
    hasAttached(): boolean;
}
export declare abstract class BasePortalHost implements PortalHost {
    private _attachedPortal;
    private _disposeFn;
    private _isDisposed;
    hasAttached(): boolean;
    attach(portal: Portal<any>): any;
    abstract attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    abstract attachTemplatePortal(portal: TemplatePortal): Map<string, any>;
    detach(): void;
    dispose(): void;
    setDisposeFn(fn: () => void): void;
}
