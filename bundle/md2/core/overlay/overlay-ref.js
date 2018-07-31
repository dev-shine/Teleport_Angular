import { Subject } from 'rxjs/Subject';
var OverlayRef = (function () {
    function OverlayRef(_portalHost, _pane, _state) {
        this._portalHost = _portalHost;
        this._pane = _pane;
        this._state = _state;
        this._backdropElement = null;
        this._backdropClick = new Subject();
    }
    OverlayRef.prototype.attach = function (portal) {
        if (this._state.hasBackdrop) {
            this._attachBackdrop();
        }
        var attachResult = this._portalHost.attach(portal);
        this.updatePosition();
        return attachResult;
    };
    OverlayRef.prototype.detach = function () {
        this._detatchBackdrop();
        return this._portalHost.detach();
    };
    OverlayRef.prototype.dispose = function () {
        this._detatchBackdrop();
        this._portalHost.dispose();
    };
    OverlayRef.prototype.hasAttached = function () {
        return this._portalHost.hasAttached();
    };
    OverlayRef.prototype.backdropClick = function () {
        return this._backdropClick.asObservable();
    };
    OverlayRef.prototype.getState = function () {
        return this._state;
    };
    OverlayRef.prototype.updatePosition = function () {
        if (this._state.positionStrategy) {
            this._state.positionStrategy.apply(this._pane);
        }
    };
    OverlayRef.prototype._attachBackdrop = function () {
        var _this = this;
        this._backdropElement = document.createElement('div');
        this._backdropElement.classList.add('md-overlay-backdrop');
        this._pane.parentElement.appendChild(this._backdropElement);
        this._backdropElement.addEventListener('click', function () {
            _this._backdropClick.next(null);
        });
        requestAnimationFrame(function () {
            _this._backdropElement.classList.add('md-overlay-backdrop-showing');
        });
    };
    OverlayRef.prototype._detatchBackdrop = function () {
        var _this = this;
        var backdropToDetach = this._backdropElement;
        if (backdropToDetach) {
            backdropToDetach.classList.remove('md-overlay-backdrop-showing');
            backdropToDetach.addEventListener('transitionend', function () {
                backdropToDetach.parentNode.removeChild(backdropToDetach);
                if (_this._backdropElement == backdropToDetach) {
                    _this._backdropElement = null;
                }
            });
        }
    };
    return OverlayRef;
}());
export { OverlayRef };
//# sourceMappingURL=overlay-ref.js.map