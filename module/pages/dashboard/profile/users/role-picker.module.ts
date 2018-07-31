
import { NgModule }                from "@angular/core";
import { BrowserModule }           from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule }            from "@angular/common";
import { FormsModule }             from "@angular/forms";
import { HttpModule }              from "@angular/http";
import { RouterModule }            from "@angular/router";

import { DevPortalComponentsModule } from "../../../../components/components.module";

import { TeleportDevPortalRolePickerComponent, TeleportDevPortalRolePickerRowComponent } from "./role-picker.component";


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule,

        DevPortalComponentsModule,
    ],
    declarations: [
        TeleportDevPortalRolePickerComponent,
        TeleportDevPortalRolePickerRowComponent,
    ],
    exports: [
        TeleportDevPortalRolePickerComponent,
        TeleportDevPortalRolePickerRowComponent,
    ],
})
export class RolePickerModule {}
