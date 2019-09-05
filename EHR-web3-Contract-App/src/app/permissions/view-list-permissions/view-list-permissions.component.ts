import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ViewPermissionPopupComponent } from '../view-permission-popup/view-permission-popup.component';
import { AddRequestComponent } from '../add-request/add-request.component';

@Component({
  selector: 'app-view-list-permissions',
  templateUrl: './view-list-permissions.component.html',
  styleUrls: ['./view-list-permissions.component.css']
})
export class ViewListPermissionsComponent implements OnInit {
  patientId: any;
  patients: any;
  displayedColumns: string[] = [];
  dataSource: any;
  dialogRef: any;
  user: any;
  walletAddress: any;
  role: any;
  url = `${environment.apiUrl}`;
  heading: string;

  constructor(
    private _httpClient: HttpClient,
    private router: Router,
    public _matDialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // if (this.route.snapshot.params) {
    //   this.patientId = this.route.snapshot.params.id;
    //   this.getPatient();
    // }



    this.user = JSON.parse(localStorage.getItem("user"));
    this.walletAddress = this.user.walletAddress;
    this.role = this.user.role;
    if (this.role === 0 || this.role === 1) {
      this.displayedColumns.push('requesterName');
    }
    if (this.role === 0 || this.role === 2) {
      this.displayedColumns.push('patientAddress');
      this.displayedColumns.push('patientName');
    }
    this.displayedColumns.push('createdAt');
    this.displayedColumns.push('permissionLevel');
    this.displayedColumns.push('status');
    if (this.role === 0 || this.role === 1) {
      this.displayedColumns.push('view');
    }
    if (this.role === 2) {
      this.url += `permission/get/requesterAddress/${this.walletAddress}`;
    } else if (this.role === 1) {
      this.url += `permission/get/patientAddress/${this.walletAddress}`;
    }
    if (this.role === 1) {
      this.heading = "Permission List";
    } else if (this.role === 2) {
      this.heading = "Request List";
    }
    this.getPatients();
  }

  getPatients(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this.url)
        .subscribe((response: any) => {
          console.log(response);
          if (response && response.status === 'OK') {
            this.patients = response.data;
            this.dataSource = this.patients;
          }
        }), error => {
        }
    });
  }

  addRequest(): void {
    this.dialogRef = this._matDialog.open(AddRequestComponent, {
      panelClass: 'contact-form-dialog',
      width: '500px'
    });

    this.dialogRef.afterClosed()
      .subscribe((response: any) => {
        this.getPatients();
        if (!response) {
          return;
        }
      });
  }

  viewPermission(permissionId): void {
    this.dialogRef = this._matDialog.open(ViewPermissionPopupComponent, {
      panelClass: 'contact-form-dialog',
      width: '500px',
      data: permissionId
    });

    this.dialogRef.afterClosed()
      .subscribe((response: any) => {
        this.getPatients();
        if (!response) {
          return;
        }
      });
  }
}
