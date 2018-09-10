import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WebStorageModule } from 'ngx-store';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatListModule
} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AuthService } from './auth.service';
import { SelfComponent } from './self/self.component';
import { AssignableBufferComponent } from './assignable-buffer/assignable-buffer.component';


@NgModule({
  declarations: [
    AppComponent,
    SelfComponent,
    AssignableBufferComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WebStorageModule,
    RouterModule.forRoot([]),

    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    
    FlexLayoutModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
