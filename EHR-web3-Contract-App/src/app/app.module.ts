import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MatIconModule, MatTableModule, MatSnackBarModule, MatButtonModule, MatRippleModule, MatSelectModule, MatTooltipModule, MatToolbarModule } from '@angular/material';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { Web3Service } from './getWeb3';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ViewPatientPopupComponent } from './view-patient-popup/view-patient-popup.component';
import { LoginComponent } from './login/login.component';
import { AddRequestComponent } from './permissions/add-request/add-request.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ViewPatientPopupComponent,
    LoginComponent,
    AddRequestComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,

    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule
  ],
  providers: [Web3Service],
  bootstrap: [AppComponent],
  entryComponents: [
    ViewPatientPopupComponent,
    AddRequestComponent
  ]
})
export class AppModule { }
