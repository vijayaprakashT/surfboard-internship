import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../app-service-.service';

@Component({
  selector: 'app-app-update',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './app-update.component.html',
  styleUrl: './app-update.component.css'
})
export class AppUpdateComponent {
  updatePageForm : FormGroup

  userUpdate : any[] =[]

  constructor(private formbuilder: FormBuilder,
              private apiService: ApiService){
         this.updatePageForm = this.formbuilder.group({
              userName :[''],
              userEmail:[''],
              userPassword:['']
            });          
}


updateUser():void{
  if(this.updatePageForm.valid){
    const userData = this.updatePageForm.value

    this.apiService.updateDetails().then((response)=>{
       console.log("user update", response.data)
       this.userUpdate = response.data
       alert('user detail updated successfully')
    }).catch((error) => {
      alert('Something went wrong while updating the user.');
    });
  }else{
    console.log('error while updating')
  }

}
  

}
