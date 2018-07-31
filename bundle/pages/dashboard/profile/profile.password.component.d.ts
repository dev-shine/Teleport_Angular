import { EventEmitter } from "@angular/core";
import "rxjs/add/operator/first";
import { Store, ReducerManagerDispatcher } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { IUser } from "teleport-module-services/services/v1/models/User";
import { UserService } from "../../../services/user.service";
import { MessageService } from "../../../services/message.service";
export declare class TeleportDevPortalProfilePasswordComponent {
    private store$;
    private dispatcher;
    private messages;
    onComplete: EventEmitter<void>;
    isBusy: boolean;
    password: string;
    newPassword: string;
    newPasswordVerify: string;
    constructor(store$: Store<TeleportCoreState>, dispatcher: ReducerManagerDispatcher, messages: MessageService);
    isPasswordValid(pw: string): boolean;
    passwordsMatch(): boolean;
    onSubmit(): void;
    onCancel(): void;
}
export declare class TeleportDevPortalUserProfilePasswordComponent {
    private users;
    private messages;
    user: IUser;
    isBusy: boolean;
    password: string;
    newPassword: string;
    newPasswordVerify: string;
    private onComplete;
    constructor(users: UserService, messages: MessageService);
    isPasswordValid(pw: string): boolean;
    passwordsMatch(): boolean;
    onSubmit(): void;
    onCancel(): void;
}
