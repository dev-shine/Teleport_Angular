import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { StoreModule } from "@ngrx/store";
import { TeleportServicesModule } from "teleport-module-services/services/services/services.module";
import { APIv1ServicesModule } from "teleport-module-services/services/v1/services/services.module";
import { DevPortalComponentsModule } from "./components/components.module";
import { DevPortalPagesModule } from "./pages/pages.module";
import { DevPortalServicesModule } from "./services/services.module";
import * as devPortalUtils from "./utils/index";
import * as devPortalModels from "./models/index";
import * as devPortalServices from "./services/index";
var DevPortalModule = (function () {
    function DevPortalModule() {
    }
    DevPortalModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BrowserModule,
                        BrowserAnimationsModule,
                        CommonModule,
                        FormsModule,
                        HttpModule,
                        TeleportServicesModule.forRoot(),
                        APIv1ServicesModule.forRoot(),
                        StoreModule,
                        DevPortalComponentsModule,
                        DevPortalPagesModule,
                        DevPortalServicesModule,
                    ],
                    exports: [
                        DevPortalComponentsModule,
                        DevPortalPagesModule,
                        DevPortalServicesModule,
                        TeleportServicesModule,
                        APIv1ServicesModule,
                    ],
                },] },
    ];
    DevPortalModule.ctorParameters = function () { return []; };
    return DevPortalModule;
}());
export { DevPortalModule };
export { devPortalUtils };
export { devPortalModels };
export { devPortalServices };
//# sourceMappingURL=index.js.map