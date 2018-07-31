import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { ILog } from "../models/interfaces";
export interface ILogsRequest {
    beginDate?: Date | string;
    endDate?: Date | string;
    appId?: string;
    direction?: "inbound" | "outbound" | "both";
    connectTime?: number;
}
export interface ILogsResponse {
    isTruncated: boolean;
    updatedOn: Date;
    beginDate: Date;
    endDate: Date;
    logs: ILog[];
}
export declare class LogsService {
    private http;
    private store$;
    private _developer;
    private _observable;
    private _observer;
    private _logs;
    private _searchParams;
    private _lastRefresh;
    constructor(http: Http, store$: Store<TeleportCoreState>);
    destroy(): void;
    readonly Observable: Observable<ILogsResponse>;
    refresh(): Promise<ILogsResponse>;
    loadLogs(logs: ILogsRequest): Promise<ILogsResponse>;
}
