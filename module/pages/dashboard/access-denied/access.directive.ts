
import { Directive, ElementRef, Input, Renderer2, Inject, AfterViewInit } from "@angular/core";

import "rxjs/add/operator/first";
import "rxjs/add/operator/map";

import { Maybe } from "monet";
import { Store } from "@ngrx/store";

import { TeleportCoreState } from "teleport-module-services/services/ngrx/index";

import { IDeveloper } from "teleport-module-services/services/v1/models/Developer";
import { ILoginAsResponse } from "teleport-module-services/services/services/login/login.service.interface";

import { validate } from "../../../utils/Permissions";


@Directive({
    selector: "[allowAccess]",
})
export class AllowAccessDirective implements AfterViewInit {

    @Input("allowAccess") private allowAccess: string;

    constructor(
        @Inject(ElementRef) private el: ElementRef,
        @Inject(Renderer2)  private renderer: Renderer2,
        @Inject(Store)      private store$: Store<TeleportCoreState>,
    ) {
        renderer.addClass(el.nativeElement, "block-access");
    }

    public ngAfterViewInit () {

        (this.store$.select("session") as Store<Maybe<ILoginAsResponse<IDeveloper>>>)
            .first(s => s.isJust())
            .map(s => s.just())
            .subscribe (s => {

                if (this.allowAccess.split(" ").some(p => s !== null && validate(s.userData.permissions, { [p]: true }))) {
                    this.renderer.removeClass(this.el.nativeElement, "block-access");
                }
            });
    }
}
