import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../app-service-.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-login',
  standalone: true,
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class AppLoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.loginForm = this.formBuilder.group({
      userEmail: new FormControl('', Validators.required ),
      userPassword: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const login = this.loginForm.value;
      return this.apiService .login(login)
       .then((response) => {
          console.log('success', response);
          const{token} = response.data
          localStorage.setItem('token' , token)
          alert('logged successfully')
          window.location.href = "http://localhost:4200/homepage"
          })
        .catch((error) => {
          console.log('something went wrong in login error', error);
        });
    } else {
      alert('invalid user or please fill the fields correctly');
      return; 
    }
  }
}
