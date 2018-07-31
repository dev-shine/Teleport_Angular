import { Injectable } from '@angular/core';
var ViewportRuler = (function () {
    function ViewportRuler() {
    }
    ViewportRuler.prototype.getViewportRect = function () {
        var documentRect = document.documentElement.getBoundingClientRect();
        var scrollPosition = this.getViewportScrollPosition(documentRect);
        var height = window.innerHeight;
        var width = window.innerWidth;
        return {
            top: scrollPosition.top,
            left: scrollPosition.left,
            bottom: scrollPosition.top + height,
            right: scrollPosition.left + width,
            height: height,
            width: width,
        };
    };
    ViewportRuler.prototype.getViewportScrollPosition = function (documentRect) {
        if (documentRect === void 0) { documentRect = document.documentElement.getBoundingClientRect(); }
        var top = documentRect.top < 0 && document.body.scrollTop == 0 ?
            -documentRect.top :
            document.body.scrollTop;
        var left = documentRect.left < 0 && document.body.scrollLeft == 0 ?
            -documentRect.left :
            document.body.scrollLeft;
        return { top: top, left: left };
    };
    ViewportRuler.decorators = [
        { type: Injectable },
    ];
    ViewportRuler.ctorParameters = function () { return []; };
    return ViewportRuler;
}());
export { ViewportRuler };
//# sourceMappingURL=viewport-ruler.js.map