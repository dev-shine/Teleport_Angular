import { Http } from "@angular/http";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { IUsageAggregateData } from "../models/interfaces";
export interface IUsageRequest {
    beginDate: Date;
    endDate: Date;
    appId?: string;
}
export interface IUsageResponse {
    beginDate: Date;
    endDate: Date;
    usage: IUsageAggregateData[];
}
export declare class UsageService {
    private http;
    private store$;
    private _developer;
    constructor(http: Http, store$: Store<TeleportCoreState>);
    pullUsage(req: IUsageRequest): Promise<IUsageResponse>;
}
