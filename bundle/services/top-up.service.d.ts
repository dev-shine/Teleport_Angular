import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { ITopUp } from "../models/interfaces";
export declare class TopUpService {
    private http;
    private store$;
    private _developer;
    private _topUp;
    private _observable;
    private _observer;
    constructor(http: Http, store$: Store<TeleportCoreState>);
    readonly Observable: Observable<ITopUp>;
    refresh(): void;
    updateTopUp(data: ITopUp): void;
}
