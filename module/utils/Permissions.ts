
// import { IUserPermissions, IUserPermissionsTree, IUserRole } from "../models/interfaces";

import { IUserPermissions, IUserPermissionsTree, IUserRole } from "teleport-module-services/services/v1/models/User";

/**
 * User Permissions template with all perm keys false.
 * @Immutable
 * @type {IUserPermissions}
 */
export const Template: IUserPermissions = Object.freeze({

    "account.create": false,
    "account.read": false,
    "account.update": false,
    "account.delete": false,

    "account.me.create": false,
    "account.me.read": false,
    "account.me.update": false,
    "account.me.delete": false,

    "account.alerts.create": false,
    "account.alerts.read": false,
    "account.alerts.delete": false,

    "account.applications.create": false,
    "account.applications.read": false,
    "account.applications.update": false,
    "account.applications.delete": false,

    "account.applications.app.create": false,
    "account.applications.app.read": false,
    "account.applications.app.update": false,
    "account.applications.app.delete": false,

    "account.applications.callFlows.create": false,
    "account.applications.callFlows.read": false,
    "account.applications.callFlows.update": false,
    "account.applications.callFlows.delete": false,

    "account.applications.credentials.create": false,
    "account.applications.credentials.read": false,
    "account.applications.credentials.delete": false,

    "account.applications.phoneNumbers.create": false,
    "account.applications.phoneNumbers.read": false,
    "account.applications.phoneNumbers.update": false,
    "account.applications.phoneNumbers.delete": false,

    "account.billing.create": false,
    "account.billing.read": false,
    "account.billing.update": false,
    "account.billing.delete": false,

    "account.billing.payments.create": false,
    "account.billing.payments.read": false,
    "account.billing.payments.update": false,
    "account.billing.payments.delete": false,

    "account.credentials.create": false,
    "account.credentials.read": false,
    "account.credentials.update": false,
    "account.credentials.delete": false,

    "account.logs.read": false,

    "account.recordings.read": false,
    "account.recordings.delete": false,

    "account.usage.read": false,

    "account.users.create": false,
    "account.users.read": false,
    "account.users.update": false,
    "account.users.delete": false,
});


/**
 * User roles with default permissions.
 * @type {IUserRole[]}
 */
export const Roles: ReadonlyArray<IUserRole> = Object.freeze([
    {
        id: "power_admin",
        role: "Power Admin",
        permissions: [
            "account.create",
            "account.read",
            "account.update",
            "account.delete",
        ],
    },
    {
        id: "admin",
        role: "Admin",
        permissions: [
            "account.me.create",
            "account.me.read",
            "account.me.update",
            "account.me.delete",
            "account.alerts.create",
            "account.alerts.read",
            "account.alerts.delete",
            "account.applications.create",
            "account.applications.read",
            "account.applications.update",
            "account.applications.delete",
            "account.credentials.create",
            "account.credentials.read",
            "account.credentials.update",
            "account.credentials.delete",
            "account.logs.read",
            "account.recordings.read",
            "account.recordings.delete",
            "account.usage.read",
            "account.users.create",
            "account.users.read",
            "account.users.update",
            "account.users.delete",
        ],
    },
    {
        id: "lead_developer",
        role: "Lead Developer",
        permissions: [
            "account.me.read",
            "account.me.update",
            "account.applications.create",
            "account.applications.read",
            "account.applications.update",
            "account.applications.delete",
        ],
    },
    {
        id: "developer",
        role: "Developer",
        permissions: [
            "account.me.read",
            "account.me.update",
            "account.applications.read",
            "account.applications.update",
        ],
    },
    {
        id: "billing",
        role: "Billing",
        permissions: [
            "account.me.read",
            "account.me.update",
            "account.applications.app.read",
            "account.billing.create",
            "account.billing.read",
            "account.billing.update",
            "account.billing.delete",
            "account.logs.read",
            "account.usage.read",
        ],
    },
    {
        id: "basic",
        role: "Basic",
        permissions: [
            "account.me.read",
            "account.me.update",
            "account.applications.app.read",
            "account.logs.read",
            "account.usage.read",
        ],
    },
]);


/**
 * An immutable copy of the User Permissions Tree.
 * @type {IUserPermissionsTree}
 */
export const Tree: IUserPermissionsTree = Object.freeze(copyTree());


/**
 * User Permissions Tree built directly from Template.
 * @returns {IUserPermissionsTree}
 */
export function copyTree (): IUserPermissionsTree {

    return (function (perms: string[]) {

        function buildNode (permArr: string[], depth: number, treeNode: IUserPermissionsTree) {

            if (permArr.length === 0) { return treeNode; }

            if (permArr.length === depth + 1) {
                treeNode.actions.push(permArr.join("."));
                return treeNode;
            }

            let rootName = permArr[depth];
            let subTree = treeNode.subTree[rootName] || {
                    node: rootName,
                    actions: [],
                    subTree: {},
                };

            treeNode.subTree[subTree.node] = subTree;

            buildNode(permArr, depth + 1, subTree);

            return treeNode;
        }

        let root: IUserPermissionsTree = {
            node: "root",
            actions: [],
            subTree: {},
        };

        return perms.map(p => p.split(".")).reduce((p, c) => buildNode(c, 0, p), buildNode([], 0, root));

    }(Object.keys(Template)));
}


/**
 * Validates that the "grantor" has the permissions to grant the "target" request.
 * @param {IUserPermissions} grantor
 * @param {IUserPermissions} target
 * @returns {boolean} True if valid.
 */
export function validate (grantor: IUserPermissions, target: IUserPermissions): boolean {

    if (! grantor || ! target) { return false; }

    if (! Object.keys(grantor).every(k => k in Template)) { return false; }

    // In the rare chance that every target's flat permission equals the grantor's, return true.
    if (Object.keys(target).every(k => target[k] === grantor[k])) { return true; }

    return Object.keys(target)
        .filter(k => !! target[k])
        .map(k => k.split("."))
        .every(ns => {
            const action = ns.pop();
            return ns.reduce((p, n) => p === true || grantor[`${p}${n}.${action}`] === true || `${p}${n}.`, "" as string|boolean) === true;
        });
}
