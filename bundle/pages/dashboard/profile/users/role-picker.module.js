import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { DevPortalComponentsModule } from "../../../../components/components.module";
import { TeleportDevPortalRolePickerComponent, TeleportDevPortalRolePickerRowComponent } from "./role-picker.component";
var RolePickerModule = (function () {
    function RolePickerModule() {
    }
    RolePickerModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    RolePickerModule.ctorParameters = function () { return []; };
    return RolePickerModule;
}());
export { RolePickerModule };
//# sourceMappingURL=role-picker.module.js.map