import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-permission-popup',
  templateUrl: './view-permission-popup.component.html',
  styleUrls: ['./view-permission-popup.component.scss']
})
export class ViewPermissionPopupComponent implements OnInit {
  permissionId: any;
  permission: any;

  constructor(
    public matDialogRef: MatDialogRef<ViewPermissionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _httpClient: HttpClient,
    public _matSnackBar: MatSnackBar
  ) {
    // matDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.permissionId = this._data;
    this.getPatient();
  }

  getPatient(): Promise<any> {
    const url = `${environment.apiUrl}permission/get/${this.permissionId}`;
    return new Promise((resolve, reject) => {
      this._httpClient.get(url)
        .subscribe((response: any) => {
          console.log(response);
          if (response && response.status === 'OK') {
            this.permission = response.data;
          }
        }), error => {
        }
    });
  }

  changeStatus(status): Promise<any> {
    const url = `${environment.apiUrl}permission/status/${status}/${this.permissionId}`;
    return new Promise((resolve, reject) => {
      this._httpClient.get(url)
        .subscribe((response: any) => {
          console.log(response);
          if (response && response.status === 'OK') {
            this.permission = response.data;
            this._matSnackBar.open(response.message, 'OK', {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          }
        }), error => {
        }
    });
  }

}
