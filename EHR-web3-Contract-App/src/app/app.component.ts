import {Component, OnInit} from '@angular/core';
import {Web3Service} from './getWeb3';
declare let require: any;
const ContractCode = require('./contract.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'contract';
  accounts: string[];
  Contract: any;
  web3: any;

  requestUserAddress: string;

  grantPermissionAddress: string;
  grantPermissionUint: number;

  checkPermissionAddress: string;
  checkPermissionAddress2: number;


  constructor(private web3Service: Web3Service) {
   // console.log('Constru', web3Service);
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
  }

  requestPermissionFromUser() {
      console.log('this.Contract', this.requestUserAddress);
      this.Contract.methods.requestPermissionFromUser(this.requestUserAddress).call({from: this.accounts[0]}, (err, res) => {
          console.log(err, res);
      });
  }

  grantPermission() {
      console.log('this.grantPermissionAddress', this.grantPermissionAddress);
      console.log('this.grantPermissionUint', this.grantPermissionUint);
      this.Contract.methods.grantPermission(this.grantPermissionAddress, this.grantPermissionUint)
          .call({from: this.accounts[0]}, (err, res) => {
                console.log(err, res);
      });
  }


  checkPermission() {
      console.log('this.grantPermissionAddress', this.checkPermissionAddress);
      console.log('this.grantPermissionUint', this.checkPermissionAddress2);
      this.Contract.methods.checkPermission(this.checkPermissionAddress, this.checkPermissionAddress2)
          .call({from: this.accounts[0]}, (err, res) => {
              console.log(err, res);
      });
  }
}
