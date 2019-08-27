import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { PermissionRequest } from './request.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {
  Web3 = require('web3');
  web3 = new this.Web3(new this.Web3.providers.HttpProvider('http://localhost:8545'));
  explorer = this.web3.eth.contract([
    {
      "constant": false,
      "inputs": [
        {
          "name": "user",
          "type": "address"
        },
        {
          "name": "requester",
          "type": "address"
        }
      ],
      "name": "AdminResetPermission",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "requester",
          "type": "address"
        },
        {
          "name": "level",
          "type": "uint256"
        }
      ],
      "name": "grantPermission",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "user",
          "type": "address"
        }
      ],
      "name": "requestPermissionFromUser",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "requester",
          "type": "address"
        }
      ],
      "name": "revokePermission",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "setOwner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "requester",
          "type": "address"
        }
      ],
      "name": "LogPermissionRequested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "requester",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "level",
          "type": "uint256"
        }
      ],
      "name": "LogPermissionGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "requester",
          "type": "address"
        }
      ],
      "name": "LogPermissionRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "requester",
          "type": "address"
        }
      ],
      "name": "LogPermissionReset",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "old",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "current",
          "type": "address"
        }
      ],
      "name": "LogOwnerChanged",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "user",
          "type": "address"
        },
        {
          "name": "requester",
          "type": "address"
        }
      ],
      "name": "checkPermission",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "user",
          "type": "address"
        },
        {
          "name": "requester",
          "type": "address"
        }
      ],
      "name": "checkRequestStatus",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]);
  contractAddress = "0x961a83914bcb73b16a8c8c46e0c7203e20cbb468";
  permissionManager = this.explorer.at(this.contractAddress);


  requestForm: FormGroup;
  request: PermissionRequest;
  patientName: string;
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
    this.requestPermissionFromUser(this.walletAddress);
    const data = this.requestForm.getRawValue();
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
  }

  checkNetwork() {
    if (!this.web3.isConnected()) {

      alert("Please connect to Metamask.");
      return -1;
    }

    // check network
    var networkID = this.web3.version.network;	// change this in the future
    var networkName = "Ropsten Test Network";	// change this in the future

    if (networkID !== "3") {
      alert("Please Switch to the " + networkName);
      return -1;
    }
    return 1;
  }

  // userAddress: address of user (patient wallet address)
  requestPermissionFromUser(userAddress) {
    alert(userAddress);
    // if (this.checkNetwork() == -1) { return; }
    // this.permissionManager.requestPermissionFromUser.estimateGas(userAddress, function (error, result) {
    //   if (!error) {
    //     this.permissionManager.requestPermissionFromUser(userAddress, function (error, result) {
    //       if (!error) { alert("Permission Request Submitted"); }
    //       else { alert(error); }
    //     });
    //   }
    //   else { alert("This function will return in an error. Please check."); }
    // });
    return;
  }
}
