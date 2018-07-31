
// export interface IDeveloper {
//     readonly id: string;
//     readonly status: string;
//     readonly createdAt: Date|string;
//     readonly numApps: number;
//     readonly maxApps: number;
//     readonly maxSubAccountsPerApp: number;
//     readonly permissions: IUserPermissions;
//     readonly portalUser?: IUser;
//     firstName: string;
//     lastName: string;
//     email: string;
//     company?: string;
//     phone?: string;
// }

// export interface IUserBasicAuth {
//     readonly userName: string;
//     readonly password: string;
//     readonly authorization?: string;
// }

// export interface ISession {
//     loginAt: Date;
//     refreshAt: Date;
//     developer: IDeveloper;
// }


export interface IAlert {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone_no?: string;
    send_receipt_on_payment: boolean;
    notify_on_app_payment: boolean;
    account_balance?: IAlertAccountBalance;
}


export interface IAlertAccountBalance {
    minutes_before_zero?: number;
    thresholds?: number[];
}

export interface ISipDomains {
    callflows: string;
}

// export interface IApplication {
//     readonly id: string;
//     readonly createdAt: Date|string;
//     readonly lastModifiedAt: Date|string;
//     readonly status: "approved" | "revoked";
//     readonly isActive: boolean;
//     name: string;
//     friendlyName: string;
//     notes: string;
//     credentials: IAppCredentials[];
//     sipDomains: ISipDomains;
// }


// export interface IAppCredentials {
//     readonly products: string[];
//     readonly apiKey: string;
//     readonly issuedAt: Date;
//     readonly scopes: string[];
//     readonly secretKey: string;
//     readonly status: "approved" | "revoked" | "pending";
// }


export interface IPayment {
    readonly id: number;
    readonly submitted_on: Date|string;
    readonly amount: number;
    readonly description: string;
}


export interface IPaymentMethod {
    token: string;
    method: string;
    card_type: string;
    last_four: string;
    is_default: boolean;
    created_on: Date|string;
    updated_on: Date|string;
    is_expired: boolean;
}


export interface IBillingRate {
    readonly type: string;
    readonly rate: number;
    readonly valid_since: Date|string;
}


export interface ITopUp {
    // Individual charge amount
    amount: number;
    // How low a balance must go to trigger a charge
    balanceThreshold: number;
    // The max amount total chargeable per day
    maxAmountPerDay: number;
    // The maxAmountPerDay top limit.
    maxAmountPerDayLimit: number;
}


// export interface IUser {
//     readonly id: number;
//     readonly developerId: string;
//     readonly createdOn: Date;
//     readonly status: "unverified" | "active";
//     readonly password: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     permissions: IUserPermissions;
//     phoneNo?: string;
//     position?: string;
//     notes?: string;
// }


// export interface IUserPermissions {

//     [key: string]: boolean | undefined;

//     "account.create"?: boolean;
//     "account.read"?: boolean;
//     "account.update"?: boolean;
//     "account.delete"?: boolean;

//     "account.me.create"?: boolean;
//     "account.me.read"?: boolean;
//     "account.me.update"?: boolean;
//     "account.me.delete"?: boolean;

//     "account.alerts.create"?: boolean;
//     "account.alerts.read"?: boolean;
//     "account.alerts.delete"?: boolean;

//     "account.applications.create"?: boolean;
//     "account.applications.read"?: boolean;
//     "account.applications.update"?: boolean;
//     "account.applications.delete"?: boolean;

//     "account.applications.app.create"?: boolean;
//     "account.applications.app.read"?: boolean;
//     "account.applications.app.update"?: boolean;
//     "account.applications.app.delete"?: boolean;

//     "account.applications.callFlows.create"?: boolean;
//     "account.applications.callFlows.read"?: boolean;
//     "account.applications.callFlows.update"?: boolean;
//     "account.applications.callFlows.delete"?: boolean;

//     "account.applications.credentials.create"?: boolean;
//     "account.applications.credentials.read"?: boolean;
//     "account.applications.credentials.delete"?: boolean;

//     "account.applications.phoneNumbers.create"?: boolean;
//     "account.applications.phoneNumbers.read"?: boolean;
//     "account.applications.phoneNumbers.update"?: boolean;
//     "account.applications.phoneNumbers.delete"?: boolean;

//     "account.billing.create"?: boolean;
//     "account.billing.read"?: boolean;
//     "account.billing.update"?: boolean;
//     "account.billing.delete"?: boolean;

//     "account.billing.payments.create"?: boolean;
//     "account.billing.payments.read"?: boolean;
//     "account.billing.payments.update"?: boolean;
//     "account.billing.payments.delete"?: boolean;

//     "account.credentials.create"?: boolean;
//     "account.credentials.read"?: boolean;
//     "account.credentials.update"?: boolean;
//     "account.credentials.delete"?: boolean;

//     "account.logs.read"?: boolean;

//     "account.recordings.read"?: boolean;
//     "account.recordings.delete"?: boolean;

//     "account.usage.read"?: boolean;

//     "account.users.create"?: boolean;
//     "account.users.read"?: boolean;
//     "account.users.update"?: boolean;
//     "account.users.delete"?: boolean;
// }


// export interface IUserPermissionsTree {
//     node: string;
//     actions: string[];
//     subTree: { [key: string]: IUserPermissionsTree };
// }


// export interface IUserRole {
//     readonly id: string;
//     readonly role: string;
//     readonly permissions: string[];
// }


export interface ILog {
    readonly id: string;
    readonly call_id: string;
    readonly api_no: string;
    readonly caller_no: string;
    readonly start_time: string|Date;
    readonly end_time: string|Date;
    readonly app_id: string;
    readonly type: string;
    readonly duration: number;
    readonly direction: string;
    readonly status: string;
    readonly connect_time_billed: number;
    readonly connect_time_sec: number;
    readonly origin_api: string;
    readonly text_message: string;
    readonly config: any;
}


export interface IAWS {
    is_inherited?: boolean;
    accessKey: string | null;
    securityKey: boolean | null;
    s3: {
        is_inherited?: boolean;
        region: string | null;
        bucket: string | null;
    };
}


export interface IWatson {
    textToSpeech: {
        is_inherited?: boolean;
        username: string | null;
        password: boolean | null;
    };
}


/**
 * The final API response.
 */
export interface IUsageDataResponse<T extends IUsageData|IUsageAggregateData> {
    begin_date: string;
    end_date: string;
    usage: T[];
}

/**
 * Itemized usage items.
 */
export interface IUsageData {
    id: number;
    flow_id: number;
    batch_id: number;
    account_id: number;
    service_id: string;
    service_label: string;
    item_type: string;
    item_label: string;
    item_quantity: number;
    item_price: number;
    item_price_total: number;
    location_state_code: string;
    location_country_code: string;
}

/**
 * Structured usage data, grouped by Service and Country.
 */
export interface IUsageAggregateData {
    service_id: string;
    service_label: string;
    locations: IUsageAggregateLocationData[];
    quantity: number;
    price_total: number;
}

export interface IUsageAggregateLocationData {
    country_code: string;
    country_label: string;
    items: IUsageAggregateItemData[];
    quantity: number;
    price_total: number;
}

export interface IUsageAggregateItemData {
    type: string;
    label: string;
    quantity: number;
    price_total: number;
}
