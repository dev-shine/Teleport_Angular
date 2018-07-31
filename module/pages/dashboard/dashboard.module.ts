import { NgModule }                from "@angular/core";
import { BrowserModule }           from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule }            from "@angular/common";
import { FormsModule }             from "@angular/forms";
import { HttpModule }              from "@angular/http";
import { RouterModule }            from "@angular/router";

import { Md2DatepickerModule } from "../../md2/datepicker";
import { Md2DateUtil }         from "../../md2/datepicker/dateUtil";

import { RolePickerModule }    from "./profile/users/role-picker.module";

import { DevPortalComponentsModule } from "../../components/components.module";
import { DevPortalServicesModule }   from "../../services/services.module";

import { TeleportDevPortalAppCredentialsComponent }                         from "./apps/apps.credentials.component";
import { TeleportDevPortalProfilePasswordComponent, TeleportDevPortalUserProfilePasswordComponent } from "./profile/profile.password.component";
import { TeleportDevPortalProfileBasicAuthComponent }                       from "./profile/profile.basic-auth.component";

import { TeleportDevPortalSupportFormComponent }          from "./support/support.component";
import { TeleportDevPortalDataLogsComponent }             from "./data/data.logs.component";
import { TeleportDevPortalDataUsageComponent }            from "./data/data.usage.component";
import { TeleportDevPortalAppByIdComponent }              from "./apps/apps.id.component";
import { TeleportDevPortalAppsCreateComponent }           from "./apps/apps-create.component";
import { TeleportDevPortalAppsComponent }                 from "./apps/apps.component";
import { TeleportDevPortalAppIntegrationAwsComponent }    from "./apps/integrations/apps.integrations.aws.component";
import { TeleportDevPortalAppIntegrationWatsonComponent } from "./apps/integrations/apps.integrations.watson.component";
import { TeleportDevPortalBillingSettingsComponent }      from "./billing/billing.settings.component";
import { TeleportDevPortalBillingPaymentComponent }       from "./billing/billing.payment.component";
import { TeleportDevPortalBillingComponent }              from "./billing/billing.component";
import { TeleportDevPortalTopUpComponent }                from "./top-up/top-up.component";
import { TeleportDevPortalProfileAlertsCreateComponent }  from "./profile/profile.alerts.create.component";
import { TeleportDevPortalProfileAlertsComponent }        from "./profile/profile.alerts.component";
import { TeleportDevPortalProfileComponent }              from "./profile/profile.component";
import { TeleportDevPortalUserProfileComponent }          from "./profile/profile.user.component";
import { TeleportDevPortalLogoutComponent }               from "./logout/logout.component";
import { TeleportDevPortalUsersComponent }                from "./profile/users/users.component";
import { TeleportDevPortalUserCreateComponent }           from "./profile/users/user.create.component";
import { TeleportDevPortalUserUpdateComponent }           from "./profile/users/user.update.component";
import { TeleportDevPortalAccessDeniedComponent }         from "./access-denied/access.component";

import { AllowAccessDirective } from "./access-denied/access.directive";


/**
 * Module for after user login.
 */
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule,

        RolePickerModule,
        Md2DatepickerModule,
        DevPortalComponentsModule,
        DevPortalServicesModule,
    ],
    declarations: [
        AllowAccessDirective,
        TeleportDevPortalAppCredentialsComponent,
        TeleportDevPortalProfilePasswordComponent,
        TeleportDevPortalUserProfilePasswordComponent,
        TeleportDevPortalProfileBasicAuthComponent,
        TeleportDevPortalSupportFormComponent,
        TeleportDevPortalDataLogsComponent,
        TeleportDevPortalDataUsageComponent,
        TeleportDevPortalAppByIdComponent,
        TeleportDevPortalAppsCreateComponent,
        TeleportDevPortalAppsComponent,
        TeleportDevPortalAppIntegrationAwsComponent,
        TeleportDevPortalAppIntegrationWatsonComponent,
        TeleportDevPortalBillingSettingsComponent,
        TeleportDevPortalBillingPaymentComponent,
        TeleportDevPortalBillingComponent,
        TeleportDevPortalTopUpComponent,
        TeleportDevPortalProfileAlertsCreateComponent,
        TeleportDevPortalProfileAlertsComponent,
        TeleportDevPortalProfileComponent,
        TeleportDevPortalUserProfileComponent,
        TeleportDevPortalLogoutComponent,
        TeleportDevPortalUsersComponent,
        TeleportDevPortalUserCreateComponent,
        TeleportDevPortalUserUpdateComponent,
        TeleportDevPortalAccessDeniedComponent,
    ],
    providers: [
        Md2DateUtil,
    ],
    exports: [
        RolePickerModule,
        Md2DatepickerModule,
        DevPortalComponentsModule,
        AllowAccessDirective,
        TeleportDevPortalAppCredentialsComponent,
        TeleportDevPortalProfilePasswordComponent,
        TeleportDevPortalUserProfilePasswordComponent,
        TeleportDevPortalProfileBasicAuthComponent,
        TeleportDevPortalSupportFormComponent,
        TeleportDevPortalDataLogsComponent,
        TeleportDevPortalDataUsageComponent,
        TeleportDevPortalAppByIdComponent,
        TeleportDevPortalAppsCreateComponent,
        TeleportDevPortalAppsComponent,
        TeleportDevPortalAppIntegrationAwsComponent,
        TeleportDevPortalAppIntegrationWatsonComponent,
        TeleportDevPortalBillingSettingsComponent,
        TeleportDevPortalBillingPaymentComponent,
        TeleportDevPortalBillingComponent,
        TeleportDevPortalTopUpComponent,
        TeleportDevPortalProfileAlertsCreateComponent,
        TeleportDevPortalProfileAlertsComponent,
        TeleportDevPortalProfileComponent,
        TeleportDevPortalUserProfileComponent,
        TeleportDevPortalLogoutComponent,
        TeleportDevPortalUsersComponent,
        TeleportDevPortalUserCreateComponent,
        TeleportDevPortalUserUpdateComponent,
        TeleportDevPortalAccessDeniedComponent,
    ],
})

export class DevPortalDashboardModule {}
