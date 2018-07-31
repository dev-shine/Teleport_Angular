import { Http } from "@angular/http";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { IWatson } from "../models/interfaces";
export interface IWatsonPutRequest {
    textToSpeech: {
        username: string;
        password: string;
    };
}
export declare class IntegrationsWatsonService {
    private http;
    private store$;
    private _developer;
    constructor(http: Http, store$: Store<TeleportCoreState>);
    getTextToSpeech(appId: string): Promise<IWatson>;
    putTextToSpeech(appId: string, watson: IWatsonPutRequest): Promise<IWatson>;
    deleteTextToSpeech(appId: string): Promise<IWatson>;
}
