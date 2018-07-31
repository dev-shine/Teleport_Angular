import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { Location }                             from "@angular/common";
import { Router }                               from "@angular/router";

import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/filter";

import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";

import { APIv1State }   from "teleport-module-services/services/v1/ngrx/index";
import { IApplication } from "teleport-module-services/services/v1/models/Application";

import { ILog }                                     from "../../../models/interfaces";
import { LogsService, ILogsResponse, ILogsRequest } from "../../../services/logs.service";
import { MessageService }                           from "../../../services/message.service";

import { TeleportLoaderService } from "teleport-module-loader";

const FIND_APPID_IN_URL = /^\/v1\/applications\/([a-z0-9\-]+)\/history\/logs/;


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-data-logs",
    templateUrl: "data.logs.html",
})
export class TeleportDevPortalDataLogsComponent implements OnInit, OnDestroy {

    public filters: ILogsRequest;

    private _logs: ILogsResponse;
    private _apps: IApplication[];
    private _subscriptions: Subscription[];

    private _sortFuncs: { [key: string]: (a: ILog, b: ILog) => number } = {
        "callIdDesc"    : (a: ILog, b: ILog) => b.call_id.localeCompare(a.call_id),
        "callIdAsc"     : (a: ILog, b: ILog) => a.call_id.localeCompare(b.call_id),
        "apiNoDesc"     : (a: ILog, b: ILog) => b.api_no.localeCompare(a.api_no),
        "apiNoAsc"      : (a: ILog, b: ILog) => a.api_no.localeCompare(b.api_no),
        "callerNoDesc"  : (a: ILog, b: ILog) => b.caller_no.localeCompare(a.caller_no),
        "callerNoAsc"   : (a: ILog, b: ILog) => a.caller_no.localeCompare(b.caller_no),
        "typeDesc"      : (a: ILog, b: ILog) => b.type.localeCompare(a.type),
        "typeAsc"       : (a: ILog, b: ILog) => a.type.localeCompare(b.type),
        "statusDesc"    : (a: ILog, b: ILog) => b.status.localeCompare(a.status),
        "statusAsc"     : (a: ILog, b: ILog) => a.status.localeCompare(b.status),
        "directionDesc" : (a: ILog, b: ILog) => b.direction.localeCompare(a.direction),
        "directionAsc"  : (a: ILog, b: ILog) => a.direction.localeCompare(b.direction),
        "durationDesc"  : (a: ILog, b: ILog) => +b.duration - +a.duration,
        "durationAsc"   : (a: ILog, b: ILog) => +a.duration - +b.duration,
        "startTimeDesc" : (a: ILog, b: ILog) => +b.start_time - +a.start_time,
        "startTimeAsc"  : (a: ILog, b: ILog) => +a.start_time - +b.start_time,
        "endTimeDesc"   : (a: ILog, b: ILog) => +b.end_time - +a.end_time,
        "endTimeAsc"    : (a: ILog, b: ILog) => +a.end_time - +b.end_time,
        "appIdDesc"     : (a: ILog, b: ILog) => b.app_id.localeCompare(a.app_id),
        "appIdAsc"      : (a: ILog, b: ILog) => a.app_id.localeCompare(b.app_id),
        "billedTimeDesc": (a: ILog, b: ILog) => +b.connect_time_billed - +a.connect_time_billed,
        "billedTimeAsc" : (a: ILog, b: ILog) => +a.connect_time_billed - +b.connect_time_billed,
        "originApiDesc" : (a: ILog, b: ILog) => b.origin_api.localeCompare(a.origin_api),
        "originApiAsc"  : (a: ILog, b: ILog) => a.origin_api.localeCompare(b.origin_api),
    };
    private _sortOn = "startTimeDesc";

    constructor (
        @Inject(LogsService)    private logs: LogsService,
        @Inject(MessageService) private messages: MessageService,
        @Inject(Router)         private router: Router,
        @Inject(Location)       private location: Location,
        @Inject(Store)          private store$: Store<TeleportCoreState & APIv1State>,
        @Inject(TeleportLoaderService) private loader: TeleportLoaderService,
    ) {}


    public ngOnInit () {

        [ this.filters, this._sortOn ] = this.getQueryFromUrl();

        this.loader.show("Looking up your logs...");
        this._subscriptions = [

            this.logs.Observable
                .filter(a => !! a)
                .subscribe((logs: ILogsResponse) => {
                    this.loader.hide();
                    this._logs = logs;
                    this.sortLogs();
                    this.filters.beginDate = new Date(String(logs.beginDate)).toLocaleString();
                    this.filters.endDate = new Date(String(logs.endDate)).toLocaleString();
                }),

                this.store$.select("v1_applications")
                    .subscribe(apps => this._apps = apps),
        ];

        setImmediate(() => this.loadLogs());
    }

    public ngOnDestroy () {

        if (this._subscriptions) {
            this._subscriptions.forEach(s => s.unsubscribe());
        }
        delete this._logs;
        delete this._apps;
    }

    public get Logs () {
        return this._logs && this._logs.logs || [];
    }

    public get isTruncated () {
        return this._logs && this._logs.isTruncated;
    }

    public get Apps () {
        return this._apps || [];
    }

    public sortLogs (sortOn?: string) {
        if (sortOn) {
            let isAsc = this._sortOn.slice(-3) === "Asc";
            if (this._sortOn.startsWith(sortOn)) {
                this._sortOn = sortOn + (isAsc ? "Desc" : "Asc");
            } else {
                this._sortOn = sortOn + "Desc";
            }
        }
        this._logs.logs = this._logs.logs.sort(this._sortFuncs[this._sortOn]);
    }
    
    public isSortOn (name: string) {
        return this._sortOn === name;
    }


    public getQueryFromUrl (): [ILogsRequest, string] {

        const params = this.router.parseUrl(this.router.url).queryParams as any;
        const appId = this.router.url.match(FIND_APPID_IN_URL)[1];
        const now = new Date();
        const filters: ILogsRequest = {
            beginDate   : params.beginDate || new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7).toLocaleString(),
            endDate     : params.endDate || now.toLocaleString(),
            appId       : params.appId || appId || "",
            direction   : (params.direction || "both") as ("inbound" | "outbound" | "both"),
            connectTime : +params.connectTime || 0,
        };

        const sortOn = params.sortOn || "startTimeDesc";

        return [ filters, sortOn ];
    }


    public setQueryOnUrl () {

        this.location.replaceState(
            (window.location as any).pathname,
            Object.keys(this.filters).reduce(
                (p: string, c: string) => `${p}&${c}=${encodeURIComponent(String((this.filters as any)[c]))}`,
                `sortOn=${this._sortOn}`,
            ),
        );
    }


    public loadLogs () {

        try {

            let filter = Object.assign({}, this.filters);
            filter.beginDate = filter.beginDate ? new Date(String(filter.beginDate)) : new Date(Date.now() - 1000 * 60 * 60);
            filter.endDate = filter.endDate ? new Date(String(filter.endDate)) : new Date();

            if (filter.beginDate >= filter.endDate) {
                this.messages.error("Logs Failure", "The Begin Date cannot be later than the End Date.");
                return;
            }

            this.setQueryOnUrl();

            this.loader.show("Looking up your logs...");
            this.logs.loadLogs(filter)
                .then(() => this.loader.hide())
                .catch(err => {
                    this.loader.hide();
                    this.messages.error("Logs Failure", err.message, err);
                });

        } catch (err) {
            console.error(err);
            this.loader.hide();
            this.messages.error("Logs Failure", err.message, err);
        }
    }
}
