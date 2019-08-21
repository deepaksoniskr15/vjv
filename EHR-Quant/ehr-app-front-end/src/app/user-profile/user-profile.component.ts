import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ViewPatientPopupComponent } from '../view-patient-popup/view-patient-popup.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  patientId: any;
  patients: any;
  displayedColumns: string[] = ['patientName', 'gender', 'socSecNo', 'address', 'view'];
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
    const url = `${environment.apiUrl}patient/get/all`;
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

  viewPatient(hash): void {
    this.dialogRef = this._matDialog.open(ViewPatientPopupComponent, {
      panelClass: 'contact-form-dialog',
      width: '1000px',
      data: hash
    });

    this.dialogRef.afterClosed()
      .subscribe((response: any) => {
        if (!response) {
          return;
        }
      });
  }
}
