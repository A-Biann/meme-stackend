import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatStepperModule} from "@angular/material/stepper";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { UploadImageComponent } from './upload-image/upload-image.component';
import {MatButtonModule} from "@angular/material/button";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import {GenerateMemeComponent} from "./generate-meme/generate-meme.component";
import {MatInputModule} from "@angular/material/input";
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";

import {HttpClientModule} from "@angular/common/http";
import {OAuthModule} from "angular-oauth2-oidc"
import {MatCardModule} from "@angular/material/card";
import { ImageTryComponent } from './image-try/image-try.component';
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {Routes} from "@angular/router";
import {RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { AboutUserComponent } from './about-user/about-user.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    UploadImageComponent,
    GenerateMemeComponent,
    HeaderComponent,
    ImageTryComponent,
    HomeComponent,
    AboutUserComponent,
  ],
  imports: [
    BrowserModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    RouterModule.forRoot(routes)
  ],

  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
