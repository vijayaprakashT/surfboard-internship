import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../app-service-.service';

@Component({
  selector: 'app-app-folder',
  standalone :true ,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './app-folder.component.html',
  styleUrl: './app-folder.component.css'
})
export class AppFolderComponent {
  userFolders: any[] = [];


   constructor(
               private apiService: ApiService){}



shownFolder(): void{
     this.apiService.showFolder().then((response)=>{
      console.log('folders fetched successfully')
      console.log(response.data)
      alert('folders fetched successfully')

     }) .catch((error) => {
      console.error('Error fetching folders:', error.message);
    });
}


pinFolder(){
 

}

editFolder(){
  

}


deleteFolder(){
  
}
}
