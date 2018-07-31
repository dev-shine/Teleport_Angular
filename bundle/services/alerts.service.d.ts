import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";
import "rxjs/add/operator/toPromise";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { IAlert } from "../models/interfaces";
export declare class AlertsService {
    private http;
    private store$;
    private _developerId;
    private subject$;
    private _observable;
    private _lastRefresh;
    constructor(http: Http, store$: Store<TeleportCoreState>);
    cleanup(): void;
    readonly Observable: Observable<IAlert[]>;
    refresh(): Promise<IAlert[]>;
    add(alert: IAlert): Promise<boolean>;
    remove(alert: IAlert): Promise<boolean>;
}
