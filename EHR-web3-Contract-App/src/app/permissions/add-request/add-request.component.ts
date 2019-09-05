import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { PermissionRequest } from './request.model';
import { environment } from '../../../environments/environment';
import { Web3Service } from 'src/app/getWeb3';
declare let require: any;
const ContractCode = require('src/app/contract.json');

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {
  accounts: string[];
  Contract: any;
  web3: any;

  requestForm: FormGroup;
  request: PermissionRequest;
  patientName: string = '';
  permissionLevelList: any = [{ id: 1, value: 'Level 1' }, { id: 2, value: 'Level 2' }, { id: 3, value: 'Level 3' }];
  user: any;
  walletAddress: any;
  userName: any;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    public _matSnackBar: MatSnackBar,
    private _httpClient: HttpClient,
    public matDialogRef: MatDialogRef<AddRequestComponent>,
    private web3Service: Web3Service
  ) {
    matDialogRef.disableClose = true;
    this.requestForm = this.createRequestForm();
  }

  createRequestForm(): FormGroup {
    return this._formBuilder.group({
      id: this.request ? [this.request.id] : null,
      requesterAddress: this.request ? [this.request.requesterAddress] : '',
      patientAddress: this.request ? [this.request.patientAddress] : '',
      patientName: this.request ? [this.request.patientName] : '',
      permissionLevel: this.request ? [this.request.permissionLevel] : '',
      status: this.request ? [this.request.status] : 0
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.userName = this.user.name;
    this.walletAddress = this.user.walletAddress;

    this.web3Service.bootstrapWeb3()
      .then((web3: any) => {
        console.log('web3', web3);
        this.web3 = web3;
        web3.eth.getAccounts().then((address) => {
          this.accounts = address;
          this.Contract = new web3.eth.Contract(ContractCode, '0x961a83914bcb73b16a8c8c46e0c7203e20cbb468');
        });
      });
  }

  getPatientName(patientAddress): Promise<any> {
    const url = `${environment.apiUrl}patient/get/walletAddress/${patientAddress}`;
    return new Promise((resolve, reject) => {
      this._httpClient.get(url)
        .subscribe((response: any) => {
          console.log(response);
          if (response && response.status === 'OK') {
            this.patientName = response.data;
          } else {
            this._matSnackBar.open(response.message, 'Try Again', {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          }
        }, error => {
          this._matSnackBar.open('Internal Server Error', 'Try Again', {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        });
    });
  }

  addRequest(): Promise<any> {
    this.requestPermissionFromUser();
    const data = this.requestForm.getRawValue();
    if (this.patientName !== '') {
      data.requesterAddress = this.walletAddress;
      data.requesterName = this.userName;
      data.patientName = this.patientName;
      const url = `${environment.apiUrl}permission/add`;
      return new Promise((resolve, reject) => {
        this._httpClient.post(url, data)
          .subscribe((response: any) => {
            console.log(response);
            if (response && response.status === 'OK') {
              this.requestForm.reset();
              this.matDialogRef.close();
              this._matSnackBar.open(response.message, 'SUCCESS', {
                duration: 4000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
            } else {
              this._matSnackBar.open(response.message, 'Try Again', {
                duration: 4000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
            }
          }, error => {
            this._matSnackBar.open('Internal Server Error', 'Try Again', {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          });
      });
    } else {
      this._matSnackBar.open('Please Select a Valid Patient Address', 'Try Again', {
        duration: 4000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
  }

  requestPermissionFromUser() {
    alert(this.walletAddress);
    console.log('this.Contract', this.walletAddress);
    this.Contract.methods.requestPermissionFromUser(this.walletAddress).call({ from: this.accounts[0] }, (err, res) => {
      console.log(err, res);
    });
  }
}
