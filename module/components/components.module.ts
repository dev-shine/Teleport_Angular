
import { NgModule } from "@angular/core";

// Components
import { TeleportReCaptchaComponent } from "./recaptcha/recaptcha.component";


@NgModule({
    declarations: [
        TeleportReCaptchaComponent,
    ],
    exports: [
        TeleportReCaptchaComponent,
    ],
})
export class DevPortalComponentsModule { }
