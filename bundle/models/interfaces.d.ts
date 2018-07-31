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
export interface IPayment {
    readonly id: number;
    readonly submitted_on: Date | string;
    readonly amount: number;
    readonly description: string;
}
export interface IPaymentMethod {
    token: string;
    method: string;
    card_type: string;
    last_four: string;
    is_default: boolean;
    created_on: Date | string;
    updated_on: Date | string;
    is_expired: boolean;
}
export interface IBillingRate {
    readonly type: string;
    readonly rate: number;
    readonly valid_since: Date | string;
}
export interface ITopUp {
    amount: number;
    balanceThreshold: number;
    maxAmountPerDay: number;
    maxAmountPerDayLimit: number;
}
export interface ILog {
    readonly id: string;
    readonly call_id: string;
    readonly api_no: string;
    readonly caller_no: string;
    readonly start_time: string | Date;
    readonly end_time: string | Date;
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
export interface IUsageDataResponse<T extends IUsageData | IUsageAggregateData> {
    begin_date: string;
    end_date: string;
    usage: T[];
}
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
