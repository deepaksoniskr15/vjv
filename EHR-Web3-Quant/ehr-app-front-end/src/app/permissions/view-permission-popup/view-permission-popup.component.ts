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
  Web3 = require('web3');
  web3 = new this.Web3(new this.Web3.providers.HttpProvider('http://localhost:8545'));

  // The file is to be included in all pages that interact with web3

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
  user: any;
  walletAddress: any;

  constructor(
    public matDialogRef: MatDialogRef<ViewPermissionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _httpClient: HttpClient,
    public _matSnackBar: MatSnackBar
  ) {
    // matDialogRef.disableClose = true;
  }

  ngOnInit() {
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
      this.grantPermission(this.walletAddress, this.permission.permissionLevel);
    } else if (status === 2) {
      this.revokePermission(this.walletAddress);
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

  // requesterAddress: address of requester
  revokePermission(requesterAddress) {
    alert(requesterAddress);
    // if (this.checkNetwork() == -1) { return; }
    // this.permissionManager.revokePermission.estimateGas(requesterAddress, function (error, result) {
    //   if (!error) {
    //     this.permissionManager.revokePermission(requesterAddress, function (error, result) {
    //       if (!error) { alert("Permission Revoked!"); }
    //       else { alert(error); }
    //     });
    //   }
    //   else { alert("This function will return in an error. Please check."); }
    // });
    return;
  }

  // requesterAddress: address of requester
  // level: integer (1,2,3...) denoting level of permission
  grantPermission(requesterAddress, level) {
    alert(requesterAddress + " " + level);
    // if (this.checkNetwork() == -1) { return; }
    // this.permissionManager.grantPermission.estimateGas(requesterAddress, level, function (error, result) {
    //   if (!error) {
    //     this.permissionManager.grantPermission(requesterAddress, level, function (error, result) {
    //       if (!error) { alert("Permission Granted!"); }
    //       else { alert(error); }
    //     });
    //   }
    //   else { alert("This function will return in an error. Please check."); }
    // });
    return;
  }

}
