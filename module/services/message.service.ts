import { Injectable, Inject } from "@angular/core";
import { DOCUMENT }           from "@angular/platform-browser";

import { Observable } from "rxjs/Observable";

import { Store, ReducerManagerDispatcher } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { Message } from "teleport-module-services/services/models/Message";
import * as actions from "teleport-module-services/services/ngrx/messages/messages.actions";


@Injectable()
export class MessageService {

    private containerDiv: HTMLElement;

    constructor (
        @Inject(DOCUMENT) private doc: HTMLDocument,
        @Inject(Store) private store$: Store<TeleportCoreState>,
        @Inject(ReducerManagerDispatcher) private dispatcher$: ReducerManagerDispatcher,
    ) {
        const div = doc.getElementById("message-container-ber2z79jspqlg14i");
        if (div !== null) {
            this.containerDiv = div;
        } else {
            this.containerDiv = doc.createElement("div");
            this.containerDiv.id = "message-container-ber2z79jspqlg14i";
            this.containerDiv.className = "messages-container";
            doc.body.appendChild(this.containerDiv);
        }

        const LevelMap = { "info": "success", "warn": "warning", "error": "danger" };
        this.dispatcher$
            .filter(action => action.type === actions.ADD)
            .subscribe((action: actions.Add) => {
                const msg = action.payload;
                this.initAlert(msg.title, msg.message, LevelMap[msg.level] as "success" | "warning" | "danger");
                this.store$.dispatch(new actions.Remove(msg));
            });
    }

    public info (title: string, message: string): void {
        this.initAlert(title, message, "success");
    }


    public warning (title: string, message: string, err?: Error): void {
        this.initAlert(title, message, "warning");
    }


    public error (title: string, message: string, err?: Error): void {
        this.initAlert(title, message, "danger");
    }

    private initAlert (title: string, message: string, type: "success" | "warning" | "danger") {

        let button = this.doc.createElement("button");
        button.type = "button";
        button.className = "close";
        button.innerHTML = "&times;";

        let h = this.doc.createElement("h5");
        h.innerText = title;

        let p = this.doc.createElement("p");
        p.innerText = message;

        let alert = this.doc.createElement("div");
        alert.className = `alert alert-dismissible alert-${type} animate`;
        alert.appendChild(button);
        alert.appendChild(h);
        alert.appendChild(p);

        let autoRemoveId = setTimeout(() => {
                if (alert.parentElement) {
                    alert.style.webkitAnimation = "fadeOutRight 2s";
                    alert.style.animation = "fadeOutRight 2s";
                    alert.style.opacity = "0";
                    setTimeout(() => { if (alert.parentElement) { this.containerDiv.removeChild(alert); } }, 2100);
                }
            }, 5000);

        alert.addEventListener("click", () => {
            if (alert.parentElement) {
                clearInterval(autoRemoveId);
                alert.style.webkitAnimation = "fadeOutRight 500ms";
                alert.style.animation = "fadeOutRight 500ms";
                alert.style.opacity = "0";
                setTimeout(() => { if (alert.parentElement) { this.containerDiv.removeChild(alert); } }, 600);
            }
        });

        this.containerDiv.appendChild(alert);
    }
}
