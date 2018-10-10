import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HasPermissionDirective } from './has-permission.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        HasPermissionDirective
    ],
    exports: [
        HasPermissionDirective
    ]
})
export class AuthModule { }

