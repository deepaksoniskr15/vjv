import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Login } from './login.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Register } from './register.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  login: Login;
  registerForm: FormGroup;
  register: Register;
  type = "login";
  roleList: any = [{ id: 1, value: 'Patient' }, { id: 2, value: 'Requester' }];

  constructor(
    private router: Router,
    public _matSnackBar: MatSnackBar,
    private _httpClient: HttpClient
  ) {
    this.loginForm = this.createLoginForm();
    this.registerForm = this.createRegisterForm();
  }

  createLoginForm(): FormGroup {
    return new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  createRegisterForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      walletAddress: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  changeType(type) {
    this.type = type;
  }

  userLogin(): Promise<any> {
    const data = this.loginForm.getRawValue();
    const url = `${environment.apiUrl}user/login`;
    return new Promise((resolve, reject) => {
      this._httpClient.post(url, data)
        .subscribe((response: any) => {
          console.log(response);
          if (response && response.status === 'OK') {
            const user = {
              id: response.data.id,
              name:response.data.name,
              email: response.data.email,
              role: response.data.role,
              walletAddress: response.data.walletAddress
            };
            localStorage.setItem('user', JSON.stringify(user));
            if (response.data.role === 0) {
              this.router.navigateByUrl('/patient/add');
            } else if (response.data.role === 1 || response.data.role === 2) {
              this.router.navigateByUrl('/permission/view');
            }

          } else {
            this._matSnackBar.open(response.message, 'Try Again', {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          }
        }, error => {
          this._matSnackBar.open('invalid credentials', 'Try Again', {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        });
    });
  }

  userRegister(): Promise<any> {
    const data = this.registerForm.getRawValue();
    const url = `${environment.apiUrl}user/register`;
    return new Promise((resolve, reject) => {
      this._httpClient.post(url, data)
        .subscribe((response: any) => {
          console.log(response);
          if (response && response.status === 'OK') {
            this.type = "login";
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



}
