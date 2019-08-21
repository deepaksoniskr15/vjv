import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ViewPermissionPopupComponent } from '../view-permission-popup/view-permission-popup.component';

@Component({
  selector: 'app-view-list-permissions',
  templateUrl: './view-list-permissions.component.html',
  styleUrls: ['./view-list-permissions.component.css']
})
export class ViewListPermissionsComponent implements OnInit {
  patientId: any;
  patients: any;
  displayedColumns: string[] = ['requestedBy', 'createdAt', 'requestFor', 'status', 'view'];
  dataSource: any;
  dialogRef: any;

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

    this.getPatients();
  }

  getPatients(): Promise<any> {
    const url = `${environment.apiUrl}permission/get/all`;
    return new Promise((resolve, reject) => {
      this._httpClient.get(url)
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
