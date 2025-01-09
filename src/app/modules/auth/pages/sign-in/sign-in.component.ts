import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '@shared/components/button/button.component';
import {AuthService} from '@app/core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, NgIf, ButtonComponent],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;
  errorMessage: string = '';
  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router, private readonly _authService: AuthService) {}

  onClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {
    if(this._authService.isLogin()){
      this._router.navigate(['/dashboard']);
    }
    this.form = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    this.submitted = true;
    const { username, password } = this.form.value;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this._authService.signIn(this.form.value).subscribe({
      next:(response)=> {
        console.log(response);
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        // this._router.navigate(['/dashboard/users']);
    },
      error:(response)=> {
        this.errorMessage = "invalid login or password";
      }
    })


  }
}
