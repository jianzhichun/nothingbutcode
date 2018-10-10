import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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
import { WebStorageModule } from 'ngx-store';
import { ThreeModule } from './three/three.module';
import { UserService } from './auth/auth.domain';
import { GithubService } from './github/github.service';
import { GithubOauthComponent } from './github/github-oauth.component';
import { FloatBallModule } from './float-ball/float-ball.module';
import { ThreeViewComponent } from './three-view/three-view.component';

@NgModule({
  declarations: [
    AppComponent,
    GithubOauthComponent,
    ThreeViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: "three-view", pathMatch: 'full' },
      { path: 'three-view', component: ThreeViewComponent },
      { path: 'github/oauth', component: GithubOauthComponent }
    ]),

    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    WebStorageModule,
    FlexLayoutModule,

    ThreeModule,
    FloatBallModule
  ],
  providers: [
    { provide: UserService, useExisting: forwardRef(() => GithubService) }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
