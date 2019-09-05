import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Web3Service } from 'src/app/getWeb3';
declare let require: any;
const ContractCode = require('src/app/contract.json');

@Component({
  selector: 'app-view-permission-popup',
  templateUrl: './view-permission-popup.component.html',
  styleUrls: ['./view-permission-popup.component.scss']
})
export class ViewPermissionPopupComponent implements OnInit {
  accounts: string[];
  Contract: any;
  web3: any;

  permissionId: any;
  permission: any;
  user: any;
  walletAddress: any;

  constructor(
    public matDialogRef: MatDialogRef<ViewPermissionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _httpClient: HttpClient,
    public _matSnackBar: MatSnackBar,
    private web3Service: Web3Service
  ) {
    // matDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.web3Service.bootstrapWeb3()
      .then((web3: any) => {
        console.log('web3', web3);
        this.web3 = web3;
        web3.eth.getAccounts().then((address) => {
          this.accounts = address;
          this.Contract = new web3.eth.Contract(ContractCode, '0x961a83914bcb73b16a8c8c46e0c7203e20cbb468');
        });
      });
    this.user = JSON.parse(localStorage.getItem("user"));
    this.walletAddress = this.user.walletAddress;
    this.permission = this._data;
    //this.getPatient();
  }

  getPatient(): Promise<any> {
    const url = `${environment.apiUrl}permission/get/${this.permission.id}`;
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
    if (status === 1) {
      this.grantPermission();
    } else if (status === 2) {
      this.grantPermission();
      //this.revokePermission(this.walletAddress);
    }
    const url = `${environment.apiUrl}permission/status/${status}/${this.permission.id}`;
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
  grantPermission() {
    alert(this.walletAddress + "--" + this.permission.permissionLevel);
    console.log('this.grantPermissionAddress', this.walletAddress);
    console.log('this.grantPermissionUint', this.permission.permissionLevel);
    this.Contract.methods.grantPermission(this.walletAddress, this.permission.permissionLevel)
      .call({ from: this.accounts[0] }, (err, res) => {
        console.log(err, res);
      });
  }

}
