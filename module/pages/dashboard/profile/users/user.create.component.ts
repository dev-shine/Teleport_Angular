import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { Router }                               from "@angular/router";

import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";

import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";
import { IUser } from "teleport-module-services/services/v1/models/User";

import { UserService }    from "../../../../services/user.service";
import { MessageService } from "../../../../services/message.service";

import { EmailValidator } from "../../../../utils/EmailValidator";
import * as Permissions   from "../../../../utils/Permissions";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-user-create",
    templateUrl: "user.create.html",
})
export class TeleportDevPortalUserCreateComponent implements OnInit, OnDestroy {

    public isBusy = false;
    public isSendInvite = true;
    public User: IUser;

    private _developer: IDeveloper;

    constructor (
        @Inject(Router)         private router: Router,
        @Inject(UserService)    private users: UserService,
        @Inject(MessageService) private messages: MessageService,
        @Inject(Store)          private store$: Store<TeleportCoreState>,
    ) {}


    public ngOnInit () {

        this.store$.select("session")
            .first(s => s.isJust())
            .map(s => s.just().userData)
            .subscribe((dev: IDeveloper) => {


                this._developer = dev;

                if (Permissions.validate(dev.permissions, { "account.users.create": true })) {

                    this.User = {
                        id: 0,
                        developerId: "",
                        createdOn: new Date(),
                        status: "unverified",
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36),
                        permissions: Object.assign({}, dev.permissions),
                        phoneNo: "",
                        position: "",
                        notes: "",
                    };

                    this.isBusy = false;

                } else {
                    return this.router.navigate(["/v1/access-denied"], { queryParams: { perms: "account.users.create" }});
                }
            });
    }


    public ngOnDestroy () {

        console.log("UIUserCreate Destroy");
        delete this._developer;
        delete this.User;
    }


    public isEmailValid () {
        return EmailValidator.isValid(this.User.email);
    }


    public isUserValid () {
        return this.isEmailValid() && Permissions.validate(this._developer.permissions, this.User.permissions);
    }


    public onSubmit () {

        if (! this.isUserValid()) {
            this.messages.warning("Invalid User", "As configured, this user is not valid.");
            return;
        }

        this.isBusy = true;
        this.users.create(this.User)
            .then(user => {
                this.messages.info("User Created", "The new user was successfully created.");
                if (this.isSendInvite) {
                    this.users.sendInvite(user);
                    this.messages.info("Email Invite Sent", "An email invitation has been sent to the user.");
                }
                this.router.navigateByUrl("/v1/account/users").catch(err => console.error(err));
            })
            .catch(err => {
                this.isBusy = false;
                this.messages.error(
                    "New User Failure",
                    "An unexpected error prevented the user from being created. Try again or contact support.",
                    err,
                );
            });
    }
}
