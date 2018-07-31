import { Component, Inject, Output, EventEmitter, Input } from "@angular/core";

import "rxjs/add/operator/first";

import { Store, ReducerManagerDispatcher } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";

import { IUser } from "teleport-module-services/services/v1/models/User";
import { IApplication } from "teleport-module-services/services/v1/models/Application";

import * as actions from "teleport-module-services/services/v1/ngrx/account/account.actions";

import { UserService }    from "../../../services/user.service";
import { MessageService } from "../../../services/message.service";
import PasswordUtil       from "../../../utils/PasswordUtil";


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-profile-password",
    templateUrl: "profile.password.html",
})
export class TeleportDevPortalProfilePasswordComponent {

    @Output() public onComplete = new EventEmitter<void>();

    public isBusy = false;
    public password = "";
    public newPassword = "";
    public newPasswordVerify = "";

    constructor(
        @Inject(Store)                    private store$: Store<TeleportCoreState>,
        @Inject(ReducerManagerDispatcher) private dispatcher: ReducerManagerDispatcher,
        @Inject(MessageService)           private messages: MessageService,
    ) {}


    public isPasswordValid (pw: string): boolean {
        return PasswordUtil.satisfies(pw);
    }

    public passwordsMatch () {
        return this.newPassword === this.newPasswordVerify;
    }

    public onSubmit () {

        if (! this.newPassword || ! this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "You must enter your new password twice.");
            return;
        }

        if (this.newPassword !== this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "The passwords do not match.");
            return;
        }

        if (this.password === this.newPassword) {
            this.messages.warning("Invalid Passwords", "The new password is the same as your current password.");
            return;
        }

        if (! PasswordUtil.satisfies(this.newPassword)) {
            this.messages.warning("Invalid Password", "The password that is at least 8 characters of caps, lowercase, numbers and special characters.");
            return;
        }

        this.isBusy = true;

        this.store$.dispatch(new actions.UpdatePassword({ dev: null, password: this.password, newPassword: this.newPassword }));

        this.dispatcher
            .first(action => action.type === actions.UPDATE_PASSWORD_SUCCESS || action.type === actions.UPDATE_PASSWORD_FAILURE)
            .subscribe((action: actions.UpdatePasswordSuccess) => {

                switch (action.type) {

                    case actions.UPDATE_PASSWORD_SUCCESS:
                        this.messages.info("Password Change Success", "Your password has been updated.");
                        this.onComplete.emit();
                        break;

                    default:
                        this.messages.error("Password Change Failure", "Your password could not be updated.");
                        this.isBusy = false;
                }
            });
    }

    public onCancel () {
        this.isBusy = false;
        this.onComplete.emit();
    }
}


@Component({
    moduleId   : String(module.id),
    selector   : "teleport-dev-portal-user-profile-password",
    templateUrl: "profile.password.html",
})
export class TeleportDevPortalUserProfilePasswordComponent {

    @Input("user") public user: IUser;

    public isBusy = false;
    public password = "";
    public newPassword = "";
    public newPasswordVerify = "";

    @Output() private onComplete = new EventEmitter<void>();

    constructor(
        @Inject(UserService) private users: UserService,
        @Inject(MessageService) private messages: MessageService,
    ) {}


    public isPasswordValid (pw: string): boolean {
        return PasswordUtil.satisfies(pw);
    }

    public passwordsMatch () {
        return this.newPassword === this.newPasswordVerify;
    }

    public onSubmit () {

        if (! this.newPassword || ! this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "You must enter your new password twice.");
            return;
        }

        if (this.newPassword !== this.newPasswordVerify) {
            this.messages.warning("Invalid Passwords", "The passwords do not match.");
            return;
        }

        if (this.password === this.newPassword) {
            this.messages.warning("Invalid Passwords", "The new password is the same as your current password.");
            return;
        }

        if (! PasswordUtil.satisfies(this.newPassword)) {
            this.messages.warning("Invalid Password", "The password that is at least 8 characters of caps, lowercase, numbers and special characters.");
            return;
        }

        this.isBusy = true;

        this.users.updatePassword(this.user, this.password, this.newPassword)
            .then(() => {
                this.messages.info("Password Change Success", "Your password has been updated.");
                this.onComplete.emit();
            })
            .catch(err => {
                this.messages.error("Password Change Failure", err.message, err);
                this.isBusy = false;
            });
    }

    public onCancel () {
        this.isBusy = false;
        this.onComplete.emit();
    }
}
