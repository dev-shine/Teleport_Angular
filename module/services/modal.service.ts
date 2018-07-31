import { Injectable, Inject } from "@angular/core";
import { DOCUMENT }           from "@angular/platform-browser";

const MODAL_HTML = `
    <div class="modal fade in" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button role="close" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title"></h4>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer">
                    <button role="cancel" type="button" class="btn btn-link" data-dismiss="modal">Cancel</button>
                    <button role="ok" type="button" class="btn btn-link">Ok</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
`;

/**
 * Modal configurations.
 *
 * Defaults: {
 *    type: "alert",
 *    buttons: {
 *      ok|cancel: {
 *          text: "Ok|Cancel",
 *          type: "link"
 *      }
 *    }
 * }
 */
export interface IConfig {
    type?: "alert" | "confirm";
    showClose?: boolean;
    buttons?: {
        cancel?: {
            text?: string;
            type?: "link" | "default" | "primary" | "success" | "info" | "warning" | "danger";
        };
        ok?: {
            text?: string;
            type?: "link" | "default" | "primary" | "success" | "info" | "warning" | "danger";
        };
    };
}

@Injectable()
export class ModalService {

    constructor(
        @Inject(DOCUMENT) private doc: HTMLDocument,
    ) {}

    public show (title: string, message: string, config?: IConfig): Promise<boolean> {
        return this.initModal(title, message, config);
    }

    private initModal (title: string, message: string, config?: IConfig): Promise<boolean> {

        return new Promise((resolve, reject) => {

            try {

                let modal = this.doc.createElement("div") as HTMLDivElement;
                modal.innerHTML = MODAL_HTML;
                modal = modal.firstElementChild as HTMLDivElement;

                let titleEl = modal.getElementsByClassName("modal-title").item(0) as HTMLHeadElement,
                    bodyEl = modal.getElementsByClassName("modal-body").item(0) as HTMLDivElement,
                    cancelButtonEl: HTMLButtonElement = this.doc.createElement("BUTTON") as HTMLButtonElement, // Just to shutup the undefined checker.
                    closeIconEl: HTMLButtonElement = this.doc.createElement("BUTTON") as HTMLButtonElement,
                    okButtonEl: HTMLButtonElement = this.doc.createElement("BUTTON") as HTMLButtonElement;

                titleEl.innerHTML = title;
                bodyEl.innerHTML = message;

                let buttons = modal.getElementsByTagName("button");
                for (let i = 0; i < buttons.length; i++) {

                    let el = buttons.item(i),
                        role = el.attributes.getNamedItem("role").value;

                    if (role) {

                        if (role === "cancel") {
                            cancelButtonEl = el;
                        } else if (role === "close") {
                            closeIconEl = el;
                        } else if (role === "ok") {
                            okButtonEl = el;
                        }

                        el.addEventListener("click", () => {
                            resolve(role === "ok");
                            modal.remove();
                        });
                    }
                }

                if (config) {

                    if (config.type !== "confirm") {
                        cancelButtonEl.remove();
                    }

                    if (config.showClose === false) {
                        closeIconEl.remove();
                    }

                    if (config.buttons) {

                        if (config.buttons.cancel) {
                            cancelButtonEl.innerText = config.buttons.cancel.text || "Cancel";
                            cancelButtonEl.className = "btn btn-" + (config.buttons.cancel.type || "link");
                        }
                        if (config.buttons.ok) {
                            okButtonEl.innerText = config.buttons.ok.text || "Ok";
                            okButtonEl.className = "btn btn-" + (config.buttons.ok.type || "link");
                        }
                    }
                } else {
                    cancelButtonEl.remove();
                    closeIconEl.remove();
                }

                this.doc.body.appendChild(modal);

            } catch (err) {
                console.error("Modal.show()", err, err.stack);
                reject(err);
            }
        });
    }
}
