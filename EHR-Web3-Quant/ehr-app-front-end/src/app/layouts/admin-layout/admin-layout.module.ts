import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatIconModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatTableModule,
  MatChipsModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule
} from '@angular/material';
import { CovalentFileModule } from '@covalent/core/file';
import { StartScrapeService } from '../../icons/start-scrape.service';
import { HttpClientModule } from '@angular/common/http';
import { ViewListPermissionsComponent } from '../../permissions/view-list-permissions/view-list-permissions.component';
import { ViewPermissionPopupComponent } from '../../permissions/view-permission-popup/view-permission-popup.component';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminLayoutRoutes),
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    CovalentFileModule,
    HttpClientModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatChipsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule
  ],
  declarations: [
    UserProfileComponent,
    IconsComponent,
    ViewListPermissionsComponent,
    ViewPermissionPopupComponent
  ],
  entryComponents: [
    ViewPermissionPopupComponent
  ],
  providers: [
    StartScrapeService
  ],
})

export class AdminLayoutModule { }
