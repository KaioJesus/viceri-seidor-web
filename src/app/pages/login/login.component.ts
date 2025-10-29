import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { NgxCaptchaModule } from 'ngx-captcha';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgxCaptchaModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  passwordVisible = false;

  constructor() { }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  ngOnInit() {
  }

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    recaptcha: new FormControl('', [Validators.required])
  });

  private readonly _router = inject(Router);
  private readonly _loginService = inject(LoginService);

  onLogin() {

    const login = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
      recaptcha: this.loginForm.get('recaptcha')?.value
    }
    this._loginService.login(login.username, login.password, login.recaptcha).subscribe({
      next: (res)=>{
        this._router.navigate(['/'])
      },
      error:(err)=>{
        console.log(err);
        if(err.status === 401){
          this.loginForm.setErrors({'invalidCredentials': true});
        } else
          this.loginForm.setErrors({'generalCredentials': true});
      }
    })
  }


}
