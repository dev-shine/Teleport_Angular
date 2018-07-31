import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
var MODAL_HTML = "\n    <div class=\"modal fade in\" tabindex=\"-1\" role=\"dialog\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button role=\"close\" type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                    <h4 class=\"modal-title\"></h4>\n                </div>\n                <div class=\"modal-body\"></div>\n                <div class=\"modal-footer\">\n                    <button role=\"cancel\" type=\"button\" class=\"btn btn-link\" data-dismiss=\"modal\">Cancel</button>\n                    <button role=\"ok\" type=\"button\" class=\"btn btn-link\">Ok</button>\n                </div>\n            </div><!-- /.modal-content -->\n        </div><!-- /.modal-dialog -->\n    </div><!-- /.modal -->\n";
var ModalService = (function () {
    function ModalService(doc) {
        this.doc = doc;
    }
    ModalService.prototype.show = function (title, message, config) {
        return this.initModal(title, message, config);
    };
    ModalService.prototype.initModal = function (title, message, config) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                var modal_1 = _this.doc.createElement("div");
                modal_1.innerHTML = MODAL_HTML;
                modal_1 = modal_1.firstElementChild;
                var titleEl = modal_1.getElementsByClassName("modal-title").item(0), bodyEl = modal_1.getElementsByClassName("modal-body").item(0), cancelButtonEl = _this.doc.createElement("BUTTON"), closeIconEl = _this.doc.createElement("BUTTON"), okButtonEl = _this.doc.createElement("BUTTON");
                titleEl.innerHTML = title;
                bodyEl.innerHTML = message;
                var buttons = modal_1.getElementsByTagName("button");
                var _loop_1 = function (i) {
                    var el = buttons.item(i), role = el.attributes.getNamedItem("role").value;
                    if (role) {
                        if (role === "cancel") {
                            cancelButtonEl = el;
                        }
                        else if (role === "close") {
                            closeIconEl = el;
                        }
                        else if (role === "ok") {
                            okButtonEl = el;
                        }
                        el.addEventListener("click", function () {
                            resolve(role === "ok");
                            modal_1.remove();
                        });
                    }
                };
                for (var i = 0; i < buttons.length; i++) {
                    _loop_1(i);
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
                }
                else {
                    cancelButtonEl.remove();
                    closeIconEl.remove();
                }
                _this.doc.body.appendChild(modal_1);
            }
            catch (err) {
                console.error("Modal.show()", err, err.stack);
                reject(err);
            }
        });
    };
    ModalService.decorators = [
        { type: Injectable },
    ];
    ModalService.ctorParameters = function () { return [
        { type: HTMLDocument, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    ]; };
    return ModalService;
}());
export { ModalService };
//# sourceMappingURL=modal.service.js.map