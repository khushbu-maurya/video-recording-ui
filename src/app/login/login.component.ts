import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../shared/service/login.service';
import { LoginPostModel } from '../shared/model/login-post-model';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  loading: boolean = false;

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {

  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['admin@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]]
    })
  }

  login(): void {
    let postData: LoginPostModel = LoginPostModel.mapFromFormData(this.loginForm.value);
    this.loading = true;
    this.loginService.loginApi(postData).pipe(take(1), finalize(() => this.loading = false)).subscribe(
      {
        next: (res) => {
          localStorage.setItem('authToken', res.token);
          this.snackBar.open("Login Successfully!!!", 'X', { verticalPosition: 'top', horizontalPosition: 'end', duration: 3000 });
          this.router.navigate(['/view-records']);
        }, error: (err) => {
           if(err.status == 401){
            this.snackBar.open("Username or Password you entered is wrong!!!", 'X', { verticalPosition: 'top', horizontalPosition: 'end', duration: 3000 });
           }
           else {
            this.snackBar.open("Something Went Wrong!!!", 'X', { verticalPosition: 'top', horizontalPosition: 'end', duration: 3000 });
           }
        }
      }
    )
  }
}
