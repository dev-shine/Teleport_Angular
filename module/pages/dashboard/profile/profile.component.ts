import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { Router }                               from "@angular/router";

import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/takeUntil";

import { Store, ReducerManagerDispatcher } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";

import { IDeveloper, Developer } from "teleport-module-services/services/v1/models/Developer";

import * as actions from "teleport-module-services/services/v1/ngrx/account/account.actions";

import { MessageService } from "../../../services/message.service";
import { ModalService }   from "../../../services/modal.service";

import { EmailValidator } from "../../../utils/EmailValidator";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-profile",
    templateUrl: "profile.html",
    // styleUrls  : [ "../../css/bootswatch.min.css", "../../css/main.min.css" ],
})
export class TeleportDevPortalProfileComponent implements OnInit, OnDestroy {

    public Developer: IDeveloper;

    public isBusy = false;
    public isEditProfile = false;
    public isChangePassword = false;

    private _developer: IDeveloper;
    private unsubscriber = new Subject();

    constructor (
        @Inject(Router)         private router: Router,
        @Inject(ModalService)   private modal: ModalService,
        @Inject(MessageService) private messages: MessageService,
        @Inject(Store)          private store$: Store<TeleportCoreState>,
        @Inject(ReducerManagerDispatcher) private dispatcher: ReducerManagerDispatcher,
    ) {}

    public ngOnInit () {

        this.store$.select("session")
            .takeUntil(this.unsubscriber)
            .filter(s => s.isJust())
            .map(s => s.just().userData)
            .subscribe(dev => {

                if (dev.portalUser) {
                    this.router.navigateByUrl("/v1/account/user");
                    return;
                }

                this._developer = new Developer(dev).toJSON();
                if (! this.isEditProfile) {
                    this.Developer = Object.assign({}, this._developer);
                    console.log(this.Developer);
                }
            });

         const OK_ACTIONS = [
            actions.UPDATE, actions.UPDATE_SUCCESS, actions.UPDATE_FAILURE,
            actions.REMOVE, actions.REMOVE_SUCCESS, actions.REMOVE_FAILURE,
        ];
        this.dispatcher
            .takeUntil(this.unsubscriber)
            .filter(action => OK_ACTIONS.indexOf(action.type) !== -1)
            .subscribe((action: actions.UpdateSuccess) => {

                switch (action.type) {

                    case actions.UPDATE:
                    case actions.REMOVE:
                        this.isBusy = true;
                        break;

                    case actions.UPDATE_SUCCESS:
                        this.messages.info("Account Updated", "The changes to your account were successfully saved.");
                        this.isBusy = false;
                        this.isEditProfile = false;
                        break;

                    case actions.REMOVE_SUCCESS:
                        this.messages.warning("Account Deleted", "Your account has been deleted.");
                        this.router.navigateByUrl("/logout");
                        break;

                    default:
                        this.isEditProfile = false;
                        this.isBusy = false;
                }
            });
    }
    
    public ngOnDestroy () {
        this.unsubscriber.complete();
        delete this.Developer;
        delete this._developer;
    }


    public onStartEditMode () {
        this.isEditProfile = true;
        this.Developer = Object.assign({}, this._developer);
    }

    public closePasswordForm () {
        this.isChangePassword = false;
    }

    public isEmailValid (email: string): boolean {
        return EmailValidator.isValid(email);
    }

    public onSubmit () {
        this.store$.dispatch(new actions.Update({ dev: this.Developer }));
    }

    public onDelete () {

        this.modal.show("Delete My Account", `<p>Clicking OK will delete your account. All applications under this account will stop working. All phone numbers will be released.</p><p>Are you sure?</p>`, { type: "confirm" })
            .then(result => {
                if (result) {
                    this.store$.dispatch(new actions.Remove({ dev: this._developer }));
                }
            });
    }

    public onCancel () {
        this.isBusy = false;
        this.isEditProfile = false;
        this.Developer = Object.assign({}, this._developer);
    }
}
