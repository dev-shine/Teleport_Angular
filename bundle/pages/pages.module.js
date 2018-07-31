import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { DevPortalDashboardModule } from "./dashboard/dashboard.module";
import { TeleportLoaderModule } from "teleport-module-loader";
import { TeleportDevPortalForgotPasswordComponent } from "./forgot-password/forgot.component";
import { TeleportDevPortalLoginComponent } from "./login/login.component";
import { TeleportDevPortalRecoverPasswordComponent } from "./recover-password/recover.component";
import { TeleportDevPortalRegisterComponent } from "./register/register.component";
var DevPortalPagesModule = (function () {
    function DevPortalPagesModule() {
    }
    DevPortalPagesModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    DevPortalPagesModule.ctorParameters = function () { return []; };
    return DevPortalPagesModule;
}());
export { DevPortalPagesModule };
//# sourceMappingURL=pages.module.js.map