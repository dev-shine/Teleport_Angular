import { PortalHost, Portal } from '../portal/portal';
import { OverlayState } from './overlay-state';
import { Observable } from 'rxjs/Observable';
export declare class OverlayRef implements PortalHost {
    private _portalHost;
    private _pane;
    private _state;
    private _backdropElement;
    private _backdropClick;
    constructor(_portalHost: PortalHost, _pane: HTMLElement, _state: OverlayState);
    attach(portal: Portal<any>): any;
    detach(): Promise<any>;
    dispose(): void;
    hasAttached(): boolean;
    backdropClick(): Observable<void>;
    getState(): OverlayState;
    updatePosition(): void;
    private _attachBackdrop();
    private _detatchBackdrop();
}
