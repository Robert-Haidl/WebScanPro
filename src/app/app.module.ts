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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgChartsModule } from 'ng2-charts';
import { ChartsComponent } from './charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    ScanFormComponent,
    FormResultComponent,
    LandingPageComponent,
    SpinnerComponent,
    DocumentationComponent,
    ChartsComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    NgChartsModule,                                                                                                                                                                                                                                                                                                                                                              
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
