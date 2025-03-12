import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../app-service-.service';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-signup',
  standalone: true,
  templateUrl: './app-signup.component.html',
  styleUrls: ['./app-signup.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class AppSignupComponent  {
  signUpForm: FormGroup; 

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: ApiService
  ) {this.signUpForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.maxLength(20)]],
    userEmail: ['', [Validators.required, Validators.email]],
    userRole:['' ,[Validators.required , Validators.maxLength(20)]],
    userPassword: ['', [Validators.required, Validators.minLength(6)]]
  })}

  

  onSubmit(){
    if(this.signUpForm.valid){
      const signUp = this.signUpForm.value
      return this.apiService.signUp(signUp).then
      ((response)=>{
        console.log('signup response' , response)
        alert('signed up successfully')
        window.location.href = 'http://localhost:4200/login';

      })
      .catch((error) => {
        console.log('something went wrong in login error', error);
      });

    }else{
      alert(' please fill the fields correctly');
      return; 
    }
}
}
