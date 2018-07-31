import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/first";
import { Store } from "@ngrx/store";
import { LoginService } from "teleport-module-services/services/services/login/login.service";
import * as i from "teleport-module-services/services/services/login/login.service.interface";
import { MessageService } from "../../services/message.service";
import { TeleportLoaderService } from "teleport-module-loader";
export declare class TeleportDevPortalLoginComponent {
    private logins;
    private messages;
    private store$;
    private loader;
    userName: string;
    passWord: string;
    userLogins: BehaviorSubject<i.ILoginAsRequest[]>;
    constructor(logins: LoginService, messages: MessageService, store$: Store<any>, loader: TeleportLoaderService);
    isPasswordValid(pw: string): boolean;
    isEmailValid(email: string): boolean;
    onSubmit(): void;
    loginAs(req: i.ILoginAsRequest): void;
    closeMultiLogin(): void;
}
