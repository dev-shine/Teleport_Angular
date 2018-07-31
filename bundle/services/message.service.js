import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { Store, ReducerManagerDispatcher } from "@ngrx/store";
import * as actions from "teleport-module-services/services/ngrx/messages/messages.actions";
var MessageService = (function () {
    function MessageService(doc, store$, dispatcher$) {
        var _this = this;
        this.doc = doc;
        this.store$ = store$;
        this.dispatcher$ = dispatcher$;
        var div = doc.getElementById("message-container-ber2z79jspqlg14i");
        if (div !== null) {
            this.containerDiv = div;
        }
        else {
            this.containerDiv = doc.createElement("div");
            this.containerDiv.id = "message-container-ber2z79jspqlg14i";
            this.containerDiv.className = "messages-container";
            doc.body.appendChild(this.containerDiv);
        }
        var LevelMap = { "info": "success", "warn": "warning", "error": "danger" };
        this.dispatcher$
            .filter(function (action) { return action.type === actions.ADD; })
            .subscribe(function (action) {
            var msg = action.payload;
            _this.initAlert(msg.title, msg.message, LevelMap[msg.level]);
            _this.store$.dispatch(new actions.Remove(msg));
        });
    }
    MessageService.prototype.info = function (title, message) {
        this.initAlert(title, message, "success");
    };
    MessageService.prototype.warning = function (title, message, err) {
        this.initAlert(title, message, "warning");
    };
    MessageService.prototype.error = function (title, message, err) {
        this.initAlert(title, message, "danger");
    };
    MessageService.prototype.initAlert = function (title, message, type) {
        var _this = this;
        var button = this.doc.createElement("button");
        button.type = "button";
        button.className = "close";
        button.innerHTML = "&times;";
        var h = this.doc.createElement("h5");
        h.innerText = title;
        var p = this.doc.createElement("p");
        p.innerText = message;
        var alert = this.doc.createElement("div");
        alert.className = "alert alert-dismissible alert-" + type + " animate";
        alert.appendChild(button);
        alert.appendChild(h);
        alert.appendChild(p);
        var autoRemoveId = setTimeout(function () {
            if (alert.parentElement) {
                alert.style.webkitAnimation = "fadeOutRight 2s";
                alert.style.animation = "fadeOutRight 2s";
                alert.style.opacity = "0";
                setTimeout(function () { if (alert.parentElement) {
                    _this.containerDiv.removeChild(alert);
                } }, 2100);
            }
        }, 5000);
        alert.addEventListener("click", function () {
            if (alert.parentElement) {
                clearInterval(autoRemoveId);
                alert.style.webkitAnimation = "fadeOutRight 500ms";
                alert.style.animation = "fadeOutRight 500ms";
                alert.style.opacity = "0";
                setTimeout(function () { if (alert.parentElement) {
                    _this.containerDiv.removeChild(alert);
                } }, 600);
            }
        });
        this.containerDiv.appendChild(alert);
    };
    MessageService.decorators = [
        { type: Injectable },
    ];
    MessageService.ctorParameters = function () { return [
        { type: HTMLDocument, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
        { type: ReducerManagerDispatcher, decorators: [{ type: Inject, args: [ReducerManagerDispatcher,] },] },
    ]; };
    return MessageService;
}());
export { MessageService };
//# sourceMappingURL=message.service.js.map