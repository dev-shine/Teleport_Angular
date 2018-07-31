import { Http } from "@angular/http";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { IAWS } from "../models/interfaces";
export interface IAWSPutRequest {
    accessKey: string;
    securityKey: string;
    s3: {
        region?: string;
        bucket: string;
    };
}
export declare class IntegrationsAWSService {
    private http;
    private store$;
    private _developer;
    constructor(http: Http, store$: Store<TeleportCoreState>);
    getAWS(appId: string): Promise<IAWS>;
    putAWS(appId: string, aws: IAWSPutRequest): Promise<IAWS>;
    deleteAWS(appId: string): Promise<IAWS>;
}
