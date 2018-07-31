var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { MdError } from '../errors/error';
var MdComponentPortalAttachedToDomWithoutOriginError = (function (_super) {
    __extends(MdComponentPortalAttachedToDomWithoutOriginError, _super);
    function MdComponentPortalAttachedToDomWithoutOriginError() {
        return _super.call(this, 'A ComponentPortal must have an origin set when attached to a DomPortalHost ' +
            'because the DOM element is not part of the Angular application context.') || this;
    }
    return MdComponentPortalAttachedToDomWithoutOriginError;
}(MdError));
export { MdComponentPortalAttachedToDomWithoutOriginError };
var MdNullPortalError = (function (_super) {
    __extends(MdNullPortalError, _super);
    function MdNullPortalError() {
        return _super.call(this, 'Must provide a portal to attach') || this;
    }
    return MdNullPortalError;
}(MdError));
export { MdNullPortalError };
var MdPortalAlreadyAttachedError = (function (_super) {
    __extends(MdPortalAlreadyAttachedError, _super);
    function MdPortalAlreadyAttachedError() {
        return _super.call(this, 'Host already has a portal attached') || this;
    }
    return MdPortalAlreadyAttachedError;
}(MdError));
export { MdPortalAlreadyAttachedError };
var MdPortalHostAlreadyDisposedError = (function (_super) {
    __extends(MdPortalHostAlreadyDisposedError, _super);
    function MdPortalHostAlreadyDisposedError() {
        return _super.call(this, 'This PortalHost has already been disposed') || this;
    }
    return MdPortalHostAlreadyDisposedError;
}(MdError));
export { MdPortalHostAlreadyDisposedError };
var MdUnknownPortalTypeError = (function (_super) {
    __extends(MdUnknownPortalTypeError, _super);
    function MdUnknownPortalTypeError() {
        return _super.call(this, 'Attempting to attach an unknown Portal type. ' +
            'BasePortalHost accepts either a ComponentPortal or a TemplatePortal.') || this;
    }
    return MdUnknownPortalTypeError;
}(MdError));
export { MdUnknownPortalTypeError };
var MdNullPortalHostError = (function (_super) {
    __extends(MdNullPortalHostError, _super);
    function MdNullPortalHostError() {
        return _super.call(this, 'Attempting to attach a portal to a null PortalHost') || this;
    }
    return MdNullPortalHostError;
}(MdError));
export { MdNullPortalHostError };
var MdNoPortalAttachedError = (function (_super) {
    __extends(MdNoPortalAttachedError, _super);
    function MdNoPortalAttachedError() {
        return _super.call(this, 'Attempting to detach a portal that is not attached to a host') || this;
    }
    return MdNoPortalAttachedError;
}(MdError));
export { MdNoPortalAttachedError };
//# sourceMappingURL=portal-errors.js.map