
import { NgModule }                from "@angular/core";
import { CommonModule }            from "@angular/common";
import { BrowserModule }           from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule }             from "@angular/forms";
import { HttpModule }              from "@angular/http";

import { StoreModule } from "@ngrx/store";

import { TeleportServicesModule } from "teleport-module-services/services/services/services.module";
// import * as coreNgrx from "teleport-module-services/services/ngrx/index";
import { APIv1ServicesModule } from "teleport-module-services/services/v1/services/services.module";
// import * as v1Ngrx from "teleport-module-services/services/v1/ngrx/index";

// Components

// Modules
import { DevPortalComponentsModule } from "./components/components.module";
import { DevPortalPagesModule }      from "./pages/pages.module";
import { DevPortalServicesModule }   from "./services/services.module";

// Services

// Models, functions and classes
import * as devPortalUtils    from "./utils/index";
import * as devPortalModels   from "./models/index";
import * as devPortalServices from "./services/index";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpModule,

        TeleportServicesModule.forRoot(),
        APIv1ServicesModule.forRoot(),
        // StoreModule.forRoot({ ...coreNgrx.getReducers(), ...v1Ngrx.getReducers() }, { metaReducers: coreNgrx.getMetaReducers() }),
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
})
export class DevPortalModule { }


/**
 * Export models, classes and functions from DevPortal lib.
 */

export { devPortalUtils };
export { devPortalModels };
export { devPortalServices };
