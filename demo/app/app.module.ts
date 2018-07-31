
import { NgModule }                from "@angular/core";
import { BrowserModule }           from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule }            from "@angular/common";
import { RouterModule }            from "@angular/router";
import { HttpModule }              from "@angular/http";
import { FormsModule }             from "@angular/forms";

import { AppComponent, appRouting } from "./app.component";

// Imports this module's bundle as "teleport-module-my-module-name" using "paths" in tsconfig.json
// and mapping in systemjs.config.js.
// If it makes things more clear for you, feel free to change this to your
// module's package name. Keeping this name does not affect your module development.
import { DevPortalModule } from "teleport-module-dev-portal";


@NgModule({
  imports: [
      // Optionally, clean out any non-needed imports.
      BrowserModule,
      BrowserAnimationsModule,
      CommonModule,
      FormsModule,
      HttpModule,
      RouterModule,
      appRouting,
      DevPortalModule,
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
