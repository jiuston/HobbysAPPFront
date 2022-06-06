import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserInputDTO } from '../modelos/UserInputDTO';
import { UserService } from '../services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: any;

  matcher = new MyErrorStateMatcher();

  user?: UserInputDTO;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })

  }

  get email() { return this.loginFormGroup.get('email') }

  get password() { return this.loginFormGroup.get('password') }

  login() {
    const user = { 'email': this.email.value, 'password': this.password.value };
    this.userService.login(user).subscribe(data => this.saveAndNavigate(data));
  }

  saveAndNavigate(data: any): void {
    if (data.status === 200) {
      this.user = data.body;
      localStorage.setItem('token', this.user!.token);
      localStorage.setItem('isAdmin', this.user!.roles.includes('ADMIN') ? 'true' : 'false');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login correcto',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/hobbys']);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: data.body,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}

