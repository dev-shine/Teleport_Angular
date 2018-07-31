export var Template = Object.freeze({
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
export var Roles = Object.freeze([
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
export var Tree = Object.freeze(copyTree());
export function copyTree() {
    return (function (perms) {
        function buildNode(permArr, depth, treeNode) {
            if (permArr.length === 0) {
                return treeNode;
            }
            if (permArr.length === depth + 1) {
                treeNode.actions.push(permArr.join("."));
                return treeNode;
            }
            var rootName = permArr[depth];
            var subTree = treeNode.subTree[rootName] || {
                node: rootName,
                actions: [],
                subTree: {},
            };
            treeNode.subTree[subTree.node] = subTree;
            buildNode(permArr, depth + 1, subTree);
            return treeNode;
        }
        var root = {
            node: "root",
            actions: [],
            subTree: {},
        };
        return perms.map(function (p) { return p.split("."); }).reduce(function (p, c) { return buildNode(c, 0, p); }, buildNode([], 0, root));
    }(Object.keys(Template)));
}
export function validate(grantor, target) {
    if (!grantor || !target) {
        return false;
    }
    if (!Object.keys(grantor).every(function (k) { return k in Template; })) {
        return false;
    }
    if (Object.keys(target).every(function (k) { return target[k] === grantor[k]; })) {
        return true;
    }
    return Object.keys(target)
        .filter(function (k) { return !!target[k]; })
        .map(function (k) { return k.split("."); })
        .every(function (ns) {
        var action = ns.pop();
        return ns.reduce(function (p, n) { return p === true || grantor["" + p + n + "." + action] === true || "" + p + n + "."; }, "") === true;
    });
}
//# sourceMappingURL=Permissions.js.map