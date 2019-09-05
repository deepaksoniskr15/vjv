import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-patient-popup',
  templateUrl: './view-patient-popup.component.html',
  styleUrls: ['./view-patient-popup.component.scss']
})
export class ViewPatientPopupComponent implements OnInit {
  hash: any;
  patient: any;

  constructor(
    public matDialogRef: MatDialogRef<ViewPatientPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _httpClient: HttpClient
  ) {
    // matDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.hash = this._data;
    this.getPatient();
  }

  getPatient(): Promise<any> {
    const url = `${environment.apiUrl}patient/get/hash/${this.hash}`;
    return new Promise((resolve, reject) => {
      this._httpClient.get(url)
        .subscribe((response: any) => {
          console.log(response);
          if (response && response.status === 'OK') {
            this.patient = response.data;
          }
        }), error => {
        }
    });
  }

}
