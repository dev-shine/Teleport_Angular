import { applyCssTransform } from '../../style/apply-transform';
var GlobalPositionStrategy = (function () {
    function GlobalPositionStrategy() {
        this._cssPosition = 'absolute';
        this._top = '';
        this._bottom = '';
        this._left = '';
        this._right = '';
        this._translateX = [];
        this._translateY = [];
    }
    GlobalPositionStrategy.prototype.fixed = function () {
        this._cssPosition = 'fixed';
        return this;
    };
    GlobalPositionStrategy.prototype.absolute = function () {
        this._cssPosition = 'absolute';
        return this;
    };
    GlobalPositionStrategy.prototype.top = function (value) {
        this._bottom = '';
        this._translateY = [];
        this._top = value;
        return this;
    };
    GlobalPositionStrategy.prototype.left = function (value) {
        this._right = '';
        this._translateX = [];
        this._left = value;
        return this;
    };
    GlobalPositionStrategy.prototype.bottom = function (value) {
        this._top = '';
        this._translateY = [];
        this._bottom = value;
        return this;
    };
    GlobalPositionStrategy.prototype.right = function (value) {
        this._left = '';
        this._translateX = [];
        this._right = value;
        return this;
    };
    GlobalPositionStrategy.prototype.centerHorizontally = function (offset) {
        if (offset === void 0) { offset = '0px'; }
        this._left = '50%';
        this._right = '';
        this._translateX = ['-50%', offset];
        return this;
    };
    GlobalPositionStrategy.prototype.centerVertically = function (offset) {
        if (offset === void 0) { offset = '0px'; }
        this._top = '50%';
        this._bottom = '';
        this._translateY = ['-50%', offset];
        return this;
    };
    GlobalPositionStrategy.prototype.apply = function (element) {
        element.style.position = this._cssPosition;
        element.style.top = this._top;
        element.style.left = this._left;
        element.style.bottom = this._bottom;
        element.style.right = this._right;
        var tranlateX = this._reduceTranslateValues('translateX', this._translateX);
        var translateY = this._reduceTranslateValues('translateY', this._translateY);
        applyCssTransform(element, tranlateX + " " + translateY);
        return Promise.resolve(null);
    };
    GlobalPositionStrategy.prototype._reduceTranslateValues = function (translateFn, values) {
        return values.map(function (t) { return translateFn + "(" + t + ")"; }).join(' ');
    };
    return GlobalPositionStrategy;
}());
export { GlobalPositionStrategy };
//# sourceMappingURL=global-position-strategy.js.map