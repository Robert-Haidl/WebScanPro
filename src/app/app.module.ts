import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScanFormComponent } from './scan-form/scan-form.component';
import { FormResultComponent } from './form-result/form-result.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DocumentationComponent } from './documentation/documentation.component';

@NgModule({
  declarations: [
    AppComponent,
    ScanFormComponent,
    FormResultComponent,
    LandingPageComponent,
    SpinnerComponent,
    DocumentationComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
