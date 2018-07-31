
// Remove the modules your module will not use.
import { NgModule }                from "@angular/core";
import { BrowserModule }           from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule }            from "@angular/common";
import { FormsModule }             from "@angular/forms";
import { HttpModule }              from "@angular/http";
import { RouterModule }            from "@angular/router";

// Modules
import { DevPortalDashboardModule } from "./dashboard/dashboard.module";
import { TeleportLoaderModule } from "teleport-module-loader";

// Components
import { TeleportDevPortalForgotPasswordComponent }  from "./forgot-password/forgot.component";
import { TeleportDevPortalLoginComponent }           from "./login/login.component";
import { TeleportDevPortalRecoverPasswordComponent } from "./recover-password/recover.component";
import { TeleportDevPortalRegisterComponent }        from "./register/register.component";

// Directives


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule,

        TeleportLoaderModule,
        DevPortalDashboardModule,
    ],
    declarations: [
        TeleportDevPortalForgotPasswordComponent,
        TeleportDevPortalLoginComponent,
        TeleportDevPortalRecoverPasswordComponent,
        TeleportDevPortalRegisterComponent,
    ],
    exports: [
        DevPortalDashboardModule,
        TeleportDevPortalForgotPasswordComponent,
        TeleportDevPortalLoginComponent,
        TeleportDevPortalRecoverPasswordComponent,
        TeleportDevPortalRegisterComponent,
    ],
})
export class DevPortalPagesModule { }
