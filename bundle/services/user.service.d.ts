import { Http } from "@angular/http";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { IUser } from "teleport-module-services/services/v1/models/User";
export declare class UserService {
    private http;
    private store$;
    private _developer;
    constructor(http: Http, store$: Store<TeleportCoreState>);
    list(): Promise<IUser[]>;
    detail(userId: number): Promise<IUser>;
    create(user: IUser): Promise<IUser>;
    update(user: IUser): Promise<IUser>;
    updatePassword(user: IUser, oldPassword: string, password: string): Promise<IUser>;
    remove(user: IUser): Promise<boolean>;
    sendInvite(user: IUser): Promise<boolean>;
}
