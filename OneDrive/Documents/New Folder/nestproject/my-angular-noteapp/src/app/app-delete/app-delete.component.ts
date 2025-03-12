import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../app-service-.service';

@Component({
  selector: 'app-app-delete',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app-delete.component.html',
  styleUrl: './app-delete.component.css'
})
export class AppDeleteComponent {
  deleteForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService) {
      this.deleteForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    console.log('Form Value:', this.deleteForm.value);
    console.log('Form Valid:', this.deleteForm.valid);
    if (this.deleteForm.valid) {
      const userData = this.deleteForm.value
      this.apiService.delUser().then((response)=>{
        console.log("user account deleted successfully", response);
        alert('user deleted successfully')
       })
       .catch((error) => {
        console.error('Error deleting user information:', error.message);
      });
    } else {
      console.log("invalid user");
    }
  }
}









