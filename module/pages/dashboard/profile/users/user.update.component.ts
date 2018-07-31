import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router }               from "@angular/router";

import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";

import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";
import { IUser } from "teleport-module-services/services/v1/models/User";

import { UserService }    from "../../../../services/user.service";
import { MessageService } from "../../../../services/message.service";
import { ModalService }   from "../../../../services/modal.service";

import { EmailValidator } from "../../../../utils/EmailValidator";
import * as Permissions   from "../../../../utils/Permissions";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-user-update",
    templateUrl: "user.update.html",
})
export class TeleportDevPortalUserUpdateComponent implements OnInit, OnDestroy {

    public isBusy = false;
    public isEditing = false;

    private _developer: IDeveloper;
    private _origUser: IUser;
    private _user: IUser;

    constructor (
        @Inject(Router)         private router: Router,
        @Inject(ActivatedRoute) private route: ActivatedRoute,
        @Inject(UserService)    private users: UserService,
        @Inject(MessageService) private messages: MessageService,
        @Inject(ModalService)   private modal: ModalService,
        @Inject(Store)          private store$: Store<TeleportCoreState>,
    ) {}


    public ngOnInit () {

        this.isBusy = true;
        const userId = parseInt((this.route.snapshot.params as any).userId, 10);

        console.log("UIUserUpdate Init", userId);

        this.store$.select("session")
            .first(s => s.isJust())
            .map(s => s.just().userData)
            .subscribe((dev: IDeveloper) => {

                this._developer = dev;

                if (this._developer.portalUser && this._developer.portalUser.id === userId ) {
                    this.messages.warning("That way madness lies!", "You cannot edit your own user here.");
                    return this.router.navigateByUrl("/v1/account/users");
                }

                if (["account.users.delete", "account.users.update"].some(p => Permissions.validate(dev.permissions, { [p]: true }))) {

                    this.users.detail(userId)
                        .then(user => {

                            if (! Permissions.validate(dev.permissions, user.permissions)) {
                                this.messages.warning("Your Permission Kung-Fu is Weak", "You do not have all the permissions required to edit this user.");
                                this.router.navigateByUrl("/v1/account/users");
                                return;
                            }

                            this._origUser = user;
                            this._user = Object.assign({}, this._origUser);
                            this._user.permissions = Object.assign({}, this._origUser.permissions);
                            this.isBusy = false;
                        })
                        .catch(err => {
                            this.messages.error("Failed to Load User", err.message, err);
                            return this.router.navigateByUrl("/v1/account/users");
                        });

                } else {
                    return this.router.navigate(["/v1/access-denied"], { queryParams: { perms: "account.users.update account.users.delete" }});
                }
            });
    }


    public ngOnDestroy () {
        delete this._user;
    }


    public get User () {
        return this._user;
    }


    public editUser () {
        this.isEditing = !! this._user;
    }


    public deleteUser () {

        this.modal.show("Delete User", `<p>Clicking OK will delete the user "${this.User.firstName} ${this.User.lastName}".</p><p>Are you sure?</p>`, { type: "confirm" })
            .then(isOk => {
                if (isOk) {
                    this.isBusy = true;
                    this.users.remove(this._user)
                        .then(() => {
                            this.messages.warning("User Deleted", `Alas, poor ${this._user.firstName}! I knew him, ${this._developer.firstName}.`);
                            return this.router.navigate(["/v1/account/users"]);
                        })
                        .catch(err => {
                            this.isBusy = false;
                            this.messages.error("User Delete Failed", `The following error occurred: ${err.message}.`, err);
                        });
                }
            });
    }


    public isEmailValid () {
        return EmailValidator.isValid(this.User.email);
    }


    public isUserValid () {
        return this.isEmailValid() && Permissions.validate(this._developer.permissions, this.User.permissions);
    }


    public saveChanges () {

        if (! this.isUserValid()) {
            this.messages.warning("Invalid User", "As configured, this user is not valid.");
            return;
        }

        this.isEditing = false;
        this.isBusy = true;

        this.users.update(this._user)
            .then(user => {
                this._origUser = user;
                this._user = Object.assign({}, this._origUser);
                this._user.permissions = Object.assign({}, this._origUser.permissions);
                this.isBusy = false;
                this.messages.info("User Updated", "This user has been successfully updated.");
            })
            .catch(err => {
                this.isBusy = false;
                this.messages.error("User Update Failed", `The following error occurred: ${err.message}.`, err);
            });
    }


    public cancelChanges () {
        this.isEditing = false;
        this._user = Object.assign({}, this._origUser);
        this._user.permissions = Object.assign({}, this._origUser.permissions);
    }

}
