import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FloatBallComponent } from './float-ball.component'
import { NgxFloatBallModule } from 'ngx-float-ball'
import { PopoverModule } from "ngx-popover";
import { AuthModule } from '../auth/auth.module';

@NgModule({
    imports: [
        CommonModule,
        NgxFloatBallModule,
        PopoverModule,
        AuthModule
    ],
    declarations: [
        FloatBallComponent
    ],
    exports: [
        FloatBallComponent
    ]
})
export class FloatBallModule { }