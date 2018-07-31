import {
    Component, OnInit, OnDestroy, Input, Inject,
} from "@angular/core";

import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";
import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";

import { IUser, IUserBasicAuth, IUserRole, IUserPermissionsTree, IUserPermissions } from "teleport-module-services/services/v1/models/User";

import { ModalService }   from "../../../../services/modal.service";

import * as Permissions from "../../../../utils/Permissions";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-role-picker",
    templateUrl: "role-picker.html",
})
export class TeleportDevPortalRolePickerComponent implements OnInit, OnDestroy {

    @Input("user")  public user: IUser;

    public isRolesSelectorOpen = false;
    public role: IUserRole | undefined;

    public Roles: IUserRole[] = [];
    public Template: IUserPermissions = Permissions.Template;
    public Tree = Permissions.Tree.subTree;

    private _developer: IDeveloper;


    constructor (
        @Inject(Store) private store$: Store<TeleportCoreState>,
    ) {}


    public ngOnInit() {

        this.store$.select("session")
            .first(s => s.isJust())
            .map(s => s.just().userData)
            .subscribe((d: IDeveloper) => {

                this._developer = d;

                this.Roles = Permissions.Roles.filter(r => {
                    return Permissions.validate(this._developer.permissions, r.permissions.reduce((p: any, c: string) => (p[c] = true) && p, {}));
                });

                this.role = Permissions.Roles.find(r => this.isRoleEvery(r));
            });
    }


    public ngOnDestroy() {
        delete this._developer;
        delete this.user;
    }

    public get Developer () {
        return this._developer;
    }

    /**
     * Checks if a user has the permissions to mark a role as active.
     * @param {IUserRole} role - the role to evaluate.
     * @returns {boolean}
     */
    public isRoleEvery (role: IUserRole): boolean {

        return role.permissions.length === Object.keys(this.user.permissions).length && role.permissions.every(p => !! this.user.permissions[p]);
    }

    public onRolesSelector () {
        this.isRolesSelectorOpen = true;
    }

    public onRolesClick (role: IUserRole) {

        if (role) {
            Object.keys(this.user.permissions).forEach(p => delete this.user.permissions[p]);
            role.permissions.forEach(p => this.user.permissions[p] = true);
        }
        this.isRolesSelectorOpen = false;
        this.role = role;
    }
}


@Component({
    moduleId : String(module.id),
    selector : "teleport-dev-portal-role-picker-row",
    template : `
        <ul>
            <li *ngFor="let node of Nodes" [ngClass]="{ collapsed: isCollapsed(node) }">
                <a *ngIf="hasChildren(node)" (click)="toggleOpen(node)"><span class="glyphicon glyphicon-triangle-right"></span></a>
                <b *ngIf="! hasChildren(node)"><span class="glyphicon glyphicon-option-horizontal"></span></b>
                {{ node[0].toUpperCase() + node.slice(1) }}
                <span>
                    <span *ngFor="let a of ['create','read','update','delete']" class="glyphicon"
                        (click)="onPermClick(node, a)"
                        [ngClass]="{ 'glyphicon-unchecked': ! hasPerm(node, a) && isPermAvailable(node, a), 'glyphicon-ok-sign': hasPerm(node, a), 'glyphicon-minus disabled': ! isPermAvailable(node, a), exact: hasExactPerm(node, a) }"
                    ></span>
                </span>
                <teleport-dev-portal-role-picker-row [dev]="dev" [user]="user" [tree]="tree[node].subTree" [readOnly]="readOnly"></teleport-dev-portal-role-picker-row>
            </li>
        </ul>
    `,
})
export class TeleportDevPortalRolePickerRowComponent implements OnInit {

    @Input("dev")      public dev: IDeveloper;
    @Input("user")     public user: IUser;
    @Input("tree")     public tree: { [key: string]: IUserPermissionsTree };
    @Input("readOnly") public readOnly: boolean;

    private _isCollapsed: { [key: string]: boolean };

    private _nodes: string[] = [];

    constructor (
        @Inject(ModalService) private modal: ModalService,
    ) {}

    public ngOnInit () {

        this._nodes = Object.keys(this.tree);
        this._isCollapsed = this._nodes.reduce((p: any, c: string) => (p[c] = true) && p, {});
    }

    public get Nodes () {
        return this._nodes;
    }

    public isCollapsed (node: string) {
        return this._isCollapsed[node];
    }

    public hasChildren (node: string) {
        return Object.keys(this.tree[node].subTree).length > 0;
    }

    public toggleOpen (node: string) {
        this._isCollapsed[node] = ! this._isCollapsed[node];
    }

    public isPermAvailable (node: string, action: string) {
        return this.tree[node].actions.some(a => a.endsWith(action));
    }


    public hasPerm (node: string, action: string) {

        if (! this.user || ! this.tree) { return false; }

        const perm = this.tree[node].actions.find(a => a.endsWith(action));
        if (! perm) { return false; }
        return Permissions.validate(this.user.permissions, { [perm]: true });
    }


    public hasExactPerm (node: string, action: string) {

        return this.user.permissions[this.tree[node].actions.find(a => a.endsWith(action)) || ""];
    }


    public onPermClick (node: string, action: string) {

        if (this.readOnly) {
            this.modal.show(
                "Permissions Locked",
                `<p>If you would like to set custom permissions for this user, change the <strong>User Role</strong> to <strong>"Custom Permissions..."</strong>.</p>`,
                { type: "alert" },
            ).catch(err => console.error(err));
            return;
        }

        if (! this.dev || ! this.user || ! this.tree) { return false; }

        const perm = this.tree[node].actions.find(a => a.endsWith(action));
        if (! perm) { return; }

        if (! Permissions.validate(this.dev.permissions, { [perm]: true })) {
            return;
        }

        if (this.hasExactPerm(node, action)) {
            delete this.user.permissions[perm];
        } else {
            this.user.permissions[perm] = true;
        }
    }
}
