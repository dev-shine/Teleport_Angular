import { Store, ReducerManagerDispatcher } from "@ngrx/store";
import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
export declare class MessageService {
    private doc;
    private store$;
    private dispatcher$;
    private containerDiv;
    constructor(doc: HTMLDocument, store$: Store<TeleportCoreState>, dispatcher$: ReducerManagerDispatcher);
    info(title: string, message: string): void;
    warning(title: string, message: string, err?: Error): void;
    error(title: string, message: string, err?: Error): void;
    private initAlert(title, message, type);
}
