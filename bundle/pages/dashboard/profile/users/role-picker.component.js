import { Component, Input, Inject, } from "@angular/core";
import { Store } from "@ngrx/store";
import { ModalService } from "../../../../services/modal.service";
import * as Permissions from "../../../../utils/Permissions";
var TeleportDevPortalRolePickerComponent = (function () {
    function TeleportDevPortalRolePickerComponent(store$) {
        this.store$ = store$;
        this.isRolesSelectorOpen = false;
        this.Roles = [];
        this.Template = Permissions.Template;
        this.Tree = Permissions.Tree.subTree;
    }
    TeleportDevPortalRolePickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store$.select("session")
            .first(function (s) { return s.isJust(); })
            .map(function (s) { return s.just().userData; })
            .subscribe(function (d) {
            _this._developer = d;
            _this.Roles = Permissions.Roles.filter(function (r) {
                return Permissions.validate(_this._developer.permissions, r.permissions.reduce(function (p, c) { return (p[c] = true) && p; }, {}));
            });
            _this.role = Permissions.Roles.find(function (r) { return _this.isRoleEvery(r); });
        });
    };
    TeleportDevPortalRolePickerComponent.prototype.ngOnDestroy = function () {
        delete this._developer;
        delete this.user;
    };
    Object.defineProperty(TeleportDevPortalRolePickerComponent.prototype, "Developer", {
        get: function () {
            return this._developer;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalRolePickerComponent.prototype.isRoleEvery = function (role) {
        var _this = this;
        return role.permissions.length === Object.keys(this.user.permissions).length && role.permissions.every(function (p) { return !!_this.user.permissions[p]; });
    };
    TeleportDevPortalRolePickerComponent.prototype.onRolesSelector = function () {
        this.isRolesSelectorOpen = true;
    };
    TeleportDevPortalRolePickerComponent.prototype.onRolesClick = function (role) {
        var _this = this;
        if (role) {
            Object.keys(this.user.permissions).forEach(function (p) { return delete _this.user.permissions[p]; });
            role.permissions.forEach(function (p) { return _this.user.permissions[p] = true; });
        }
        this.isRolesSelectorOpen = false;
        this.role = role;
    };
    TeleportDevPortalRolePickerComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-role-picker",
                    templateUrl: "role-picker.html",
                },] },
    ];
    TeleportDevPortalRolePickerComponent.ctorParameters = function () { return [
        { type: Store, decorators: [{ type: Inject, args: [Store,] },] },
    ]; };
    TeleportDevPortalRolePickerComponent.propDecorators = {
        'user': [{ type: Input, args: ["user",] },],
    };
    return TeleportDevPortalRolePickerComponent;
}());
export { TeleportDevPortalRolePickerComponent };
var TeleportDevPortalRolePickerRowComponent = (function () {
    function TeleportDevPortalRolePickerRowComponent(modal) {
        this.modal = modal;
        this._nodes = [];
    }
    TeleportDevPortalRolePickerRowComponent.prototype.ngOnInit = function () {
        this._nodes = Object.keys(this.tree);
        this._isCollapsed = this._nodes.reduce(function (p, c) { return (p[c] = true) && p; }, {});
    };
    Object.defineProperty(TeleportDevPortalRolePickerRowComponent.prototype, "Nodes", {
        get: function () {
            return this._nodes;
        },
        enumerable: true,
        configurable: true
    });
    TeleportDevPortalRolePickerRowComponent.prototype.isCollapsed = function (node) {
        return this._isCollapsed[node];
    };
    TeleportDevPortalRolePickerRowComponent.prototype.hasChildren = function (node) {
        return Object.keys(this.tree[node].subTree).length > 0;
    };
    TeleportDevPortalRolePickerRowComponent.prototype.toggleOpen = function (node) {
        this._isCollapsed[node] = !this._isCollapsed[node];
    };
    TeleportDevPortalRolePickerRowComponent.prototype.isPermAvailable = function (node, action) {
        return this.tree[node].actions.some(function (a) { return a.endsWith(action); });
    };
    TeleportDevPortalRolePickerRowComponent.prototype.hasPerm = function (node, action) {
        if (!this.user || !this.tree) {
            return false;
        }
        var perm = this.tree[node].actions.find(function (a) { return a.endsWith(action); });
        if (!perm) {
            return false;
        }
        return Permissions.validate(this.user.permissions, (_a = {}, _a[perm] = true, _a));
        var _a;
    };
    TeleportDevPortalRolePickerRowComponent.prototype.hasExactPerm = function (node, action) {
        return this.user.permissions[this.tree[node].actions.find(function (a) { return a.endsWith(action); }) || ""];
    };
    TeleportDevPortalRolePickerRowComponent.prototype.onPermClick = function (node, action) {
        if (this.readOnly) {
            this.modal.show("Permissions Locked", "<p>If you would like to set custom permissions for this user, change the <strong>User Role</strong> to <strong>\"Custom Permissions...\"</strong>.</p>", { type: "alert" }).catch(function (err) { return console.error(err); });
            return;
        }
        if (!this.dev || !this.user || !this.tree) {
            return false;
        }
        var perm = this.tree[node].actions.find(function (a) { return a.endsWith(action); });
        if (!perm) {
            return;
        }
        if (!Permissions.validate(this.dev.permissions, (_a = {}, _a[perm] = true, _a))) {
            return;
        }
        if (this.hasExactPerm(node, action)) {
            delete this.user.permissions[perm];
        }
        else {
            this.user.permissions[perm] = true;
        }
        var _a;
    };
    TeleportDevPortalRolePickerRowComponent.decorators = [
        { type: Component, args: [{
                    moduleId: String(module.id),
                    selector: "teleport-dev-portal-role-picker-row",
                    template: "\n        <ul>\n            <li *ngFor=\"let node of Nodes\" [ngClass]=\"{ collapsed: isCollapsed(node) }\">\n                <a *ngIf=\"hasChildren(node)\" (click)=\"toggleOpen(node)\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a>\n                <b *ngIf=\"! hasChildren(node)\"><span class=\"glyphicon glyphicon-option-horizontal\"></span></b>\n                {{ node[0].toUpperCase() + node.slice(1) }}\n                <span>\n                    <span *ngFor=\"let a of ['create','read','update','delete']\" class=\"glyphicon\"\n                        (click)=\"onPermClick(node, a)\"\n                        [ngClass]=\"{ 'glyphicon-unchecked': ! hasPerm(node, a) && isPermAvailable(node, a), 'glyphicon-ok-sign': hasPerm(node, a), 'glyphicon-minus disabled': ! isPermAvailable(node, a), exact: hasExactPerm(node, a) }\"\n                    ></span>\n                </span>\n                <teleport-dev-portal-role-picker-row [dev]=\"dev\" [user]=\"user\" [tree]=\"tree[node].subTree\" [readOnly]=\"readOnly\"></teleport-dev-portal-role-picker-row>\n            </li>\n        </ul>\n    ",
                },] },
    ];
    TeleportDevPortalRolePickerRowComponent.ctorParameters = function () { return [
        { type: ModalService, decorators: [{ type: Inject, args: [ModalService,] },] },
    ]; };
    TeleportDevPortalRolePickerRowComponent.propDecorators = {
        'dev': [{ type: Input, args: ["dev",] },],
        'user': [{ type: Input, args: ["user",] },],
        'tree': [{ type: Input, args: ["tree",] },],
        'readOnly': [{ type: Input, args: ["readOnly",] },],
    };
    return TeleportDevPortalRolePickerRowComponent;
}());
export { TeleportDevPortalRolePickerRowComponent };
//# sourceMappingURL=role-picker.component.js.map