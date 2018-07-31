import { Directive, ElementRef, Input, Renderer2, Inject } from "@angular/core";
import "rxjs/add/operator/first";
import "rxjs/add/operator/map";
import { Store } from "@ngrx/store";
import { validate } from "../../../utils/Permissions";
var AllowAccessDirective = (function () {
    function AllowAccessDirective(el, renderer, store$) {
        this.el = el;
        this.renderer = renderer;
        this.store$ = store$;
        renderer.addClass(el.nativeElement, "block-access");
    }
    AllowAccessDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just(); })
            .subscribe(function (s) {
            if (_this.allowAccess.split(" ").some(function (p) {
                return s !== null && validate(s.userData.permissions, (_a = {}, _a[p] = true, _a));
                var _a;
            })) {
                _this.renderer.removeClass(_this.el.nativeElement, "block-access");
            }
        });
    };
    AllowAccessDirective.decorators = [
        { type: Directive, args: [{
                    selector: "[allowAccess]",
                },] },
    ];
    AllowAccessDirective.ctorParameters = function () { return [
        { type: ElementRef, decorators: [{ type: Inject, args: [ElementRef,] },] },
        { type: Renderer2, decorators: [{ type: Inject, args: [Renderer2,] },] },
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    AllowAccessDirective.propDecorators = {
        'allowAccess': [{ type: Input, args: ["allowAccess",] },],
    };
    return AllowAccessDirective;
}());
export { AllowAccessDirective };
//# sourceMappingURL=access.directive.js.map