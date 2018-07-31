import { OnInit } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import { Store } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { APIv1State } from "teleport-module-services/services/v1/ngrx/index";
import { IApplication } from "teleport-module-services/services/v1/models/Application";
import { MessageService } from "../../../services/message.service";
export declare class TeleportDevPortalSupportFormComponent implements OnInit {
    private http;
    private messages;
    private store$;
    form: {
        account: string;
        app: string;
        name: string;
        email: string;
        phone: string;
        topic: string;
        priority: string;
        description: string;
    };
    Applications: IApplication[];
    isSubmitted: boolean;
    isSuccess: boolean;
    constructor(http: Http, messages: MessageService, store$: Store<TeleportCoreState & APIv1State>);
    ngOnInit(): void;
    isEmailValid(email: string): boolean;
    onSubmit(): void;
}
