import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../app-service-.service';

@Component({
  selector: 'app-app-userinfo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app-userinfo.component.html',
  styleUrls: ['./app-userinfo.component.css'], // Fixed property name
})
export class AppUserinfoComponent {
  accessForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.accessForm = this.formBuilder.group({
      userEmail: new FormControl('', Validators.required),
      userPassword: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.accessForm.valid) {
      const userData = this.accessForm.value;
      this.apiService
        .getUser(userData)
        .then((response) => {
          console.log('Accessed successfully', response);
          // localStorage.getItem('token'); // Store token if needed
          alert('User info accessed successfully');
          window.location.href = 'http://localhost:4200/profile'; // Navigate to profile
        })
        .catch((error) => {
          console.error('Error accessing user info:', error);
          alert('Something went wrong. Please try again.');
        });
    } else {
      alert('Invalid user. Please fill in all fields.');
    }
  }
}
