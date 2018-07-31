
import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { Location }                             from "@angular/common";
import { Router }                               from "@angular/router";

import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/filter";

import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";

import { APIv1State }   from "teleport-module-services/services/v1/ngrx/index";
import { IApplication } from "teleport-module-services/services/v1/models/Application";

import { IUsageAggregateData } from "../../../models/interfaces";
import { MessageService }      from "../../../services/message.service";

import { UsageService, IUsageRequest, IUsageResponse } from "../../../services/usage.service";

import { TeleportLoaderService } from "teleport-module-loader";


export interface IFilters {
    beginDate: string;
    endDate: string;
    appId: string;
}

export interface IUsageView {
    type: "total" | "service" | "location" | "item";
    description: string;
    quantity: number;
    average: number;
    total: number;
}


const FIND_APPID_IN_URL = /^\/v1\/applications\/([a-z0-9\-]+)\/history\/usage/;


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-data-usage",
    templateUrl: "data.usage.html",
})
export class TeleportDevPortalDataUsageComponent implements OnInit, OnDestroy {

    public filters: IFilters;

    private _usage: IUsageView[];
    private _apps: IApplication[];
    private _subscription: Subscription;


    constructor (
        @Inject(UsageService)   public usage: UsageService,
        @Inject(MessageService) private messages: MessageService,
        @Inject(Router)         private router: Router,
        @Inject(Location)       private location: Location,
        @Inject(Store)          private store$: Store<TeleportCoreState & APIv1State>,
        @Inject(TeleportLoaderService) private loader: TeleportLoaderService,
    ) {}


    public getQueryFromUrl (): [IFilters] {

        const params = this.router.parseUrl(this.router.url).queryParams as any;
        const appId = this.router.url.match(FIND_APPID_IN_URL)[1];
        const filters: IFilters = {
            beginDate   : params.beginDate,
            endDate     : params.endDate,
            appId       : params.appId || appId || "",
        };

        return [ filters ];
    }


    public setQueryOnUrl () {

        this.location.replaceState(
            (window.location as any).pathname,
            `beginDate=${encodeURIComponent(this.filters.beginDate)}&endDate=${encodeURIComponent(this.filters.endDate)}&appId=${this.filters.appId}`,
        );
    }


    public ngOnInit () {

        [ this.filters ] = this.getQueryFromUrl();

        this.loader.show("Looking up your usage...");

        this._subscription = this.store$.select("v1_applications").subscribe(apps => this._apps = apps);

        setImmediate(() => this.loadUsage());
    }


    public ngOnDestroy () {

        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        delete this._usage;
        delete this._apps;
    }


    public get Usage (): IUsageView[] {
        return this._usage;
    }


    public get Apps () {
        return this._apps || [];
    }


    public loadUsage (): void {

        try {

            const [now, first] = this.getNowAndFirst();
            const req: IUsageRequest = {
                beginDate: this.filters.beginDate ? new Date(this.filters.beginDate) : first,
                endDate: this.filters.endDate ? new Date(this.filters.endDate) : now,
                appId: this.filters.appId || "",
            };

            if (isNaN(req.beginDate.getTime()) || isNaN(req.endDate.getTime())) {
                this.messages.error("Usage Failure", "The Begin and/or End Dates are invalid.");
                return;
            }
            if (req.beginDate >= req.endDate) {
                this.messages.error("Usage Failure", "The Begin Date cannot be later than the End Date.");
                return;
            }
            if (req.endDate.getTime() - req.beginDate.getTime() > 1000 * 60 * 60 * 24 * 31) {
                this.messages.error("Usage Failure", "The Begin Date and End Date cannot span more that a month.");
                return;
            }

            this.loader.show("Looking up your usage...");
            this.usage.pullUsage(req)
                .then((u: IUsageResponse) => {
                    this.loader.hide();
                    this.filters.beginDate = new Date(u.beginDate).toLocaleString();
                    this.filters.endDate = new Date(u.endDate).toLocaleString();
                    this._usage = this.transformUsage(u.usage);
                    this.setQueryOnUrl();
                })
                .catch(err => {
                    this.loader.hide();
                    this.messages.error("Usage Failure", err.message, err);
                });

        } catch (err) {
            console.error(err);
            this.loader.hide();
            this.messages.error("Usage Failure", err.message, err);
        }
    }


    private transformUsage (usage: IUsageAggregateData[]): IUsageView[] {

        const usageView: IUsageView[] = [{
            type: "total",
            description: "",
            quantity: 0,
            average: 0,
            total: 0,
        }];

        usage.sort((a, b) => a.service_label.localeCompare(b.service_label))
            .forEach(service => {

                usageView[0].quantity += service.quantity;
                usageView[0].total += service.price_total;

                usageView.push({
                    type: "service",
                    description: service.service_label,
                    quantity: service.quantity,
                    average: service.price_total / service.quantity,
                    total: service.price_total,
                });

                service.locations.sort((a, b) => a.country_label.localeCompare(b.country_label))
                    .forEach(location => {

                        usageView.push({
                            type: "location",
                            description: location.country_label,
                            quantity: location.quantity,
                            average: location.price_total / location.quantity,
                            total: location.price_total,
                        });

                        location.items.sort((a, b) => a.label.localeCompare(b.label))
                            .forEach(item => {

                                usageView.push({
                                    type: "item",
                                    description: item.label,
                                    quantity: item.quantity,
                                    average: item.price_total / item.quantity,
                                    total: item.price_total,
                                });
                            });
                    });
            });

        usageView[0].average = usageView[0].quantity ? usageView[0].total / usageView[0].quantity : 0;
        return usageView;
    }


    private getNowAndFirst (): [ Date, Date ] {

        const now = new Date();
        const first = new Date();
        first.setDate(1);
        first.setHours(0, 0, 0, 0);
        return [ now, first ];
    }
}
