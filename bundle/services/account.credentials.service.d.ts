import { Http } from "@angular/http";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { IUserBasicAuth } from "teleport-module-services/services/v1/models/User";
export declare class AccountCredentialsService {
    private http;
    private store$;
    private _developer;
    constructor(http: Http, store$: Store<TeleportCoreState>);
    cleanup(): void;
    list(userId: string): Promise<IUserBasicAuth[]>;
    create(userId: string): Promise<IUserBasicAuth[]>;
    remove(userId: string, password: string): Promise<IUserBasicAuth[]>;
}
