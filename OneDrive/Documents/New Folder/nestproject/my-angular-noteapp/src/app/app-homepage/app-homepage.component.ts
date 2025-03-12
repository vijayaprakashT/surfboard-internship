import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../app-service-.service';

@Component({
  selector: 'app-app-homepage',
  standalone: true,
  templateUrl: './app-homepage.component.html',
  styleUrls: ['./app-homepage.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NgFor],
})
export class AppHomepageComponent implements OnInit {
  homepageForm: FormGroup;
  userNotes: any[] = [];

  constructor(
    private formbuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.homepageForm = this.formbuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      folder: [''],
    });
  }
  ngOnInit(): void {
    this.shownAddedNote();
  }
  
  shownAddedNote() {
    const token = localStorage.getItem('token'); 
    if (!token) {
      console.warn('Token not found in local storage.');
      return; 
    }
  
    this.apiService.getUserAllNotes() 
    .then((response) => {
        console.log('Notes fetched successfully:', response);
  
        if (response) {
          this.userNotes = response.data; 
          console.log('User Notes:', this.userNotes); 
        } else {
          console.log('No notes found in response:', response);
        }
      })
      .catch((error) => {
        console.error('Error fetching notes:', error.message);
      });
  }
  

  onSubmit(): void {
    if (this.homepageForm.valid) {
      const userData = this.homepageForm.value;
  
      this.apiService
        .addNotes(userData) 
        .then((response) => {
          console.log('Note added successfully:', response);
          
          this.shownAddedNote(); 
          alert('Note added successfully');
          this.resetForm();

          
          this.resetForm();
        })
        .catch((error) => {
          console.error('Something went wrong while adding the note:', error);
          alert('Something went wrong. Please try again.');
        });
    } else {
      alert('Invalid input or please fill the fields correctly');
    }
  }
  

  pinNote(note: any): void {
    const userData = this.homepageForm.value
    this.apiService
      .updateNote(userData)
      .then((response) => {
        const index = this.userNotes.findIndex((n) => n.title === note.title);
        if (index !== -1) {
          const data = response.data;
          const [pinnedNote] = this.userNotes.splice(index, 1);
          this.userNotes.unshift(pinnedNote);
        }
        alert('Note pinned successfully');
      })
      .catch((error) => {
        alert('Something went wrong while pinning the note. Please try again.');
      });
  }



  editNote(note: any): void {
    this.homepageForm.patchValue({ 
      title: note.title,
      description: note.description
    });
  }

  updateNote(): void {
    if (this.homepageForm.valid) {
      const userData = this.homepageForm.value;

      this.apiService
        .updateNote(userData)
        .then((response) => {
          console.log('note edited successfully' , response.data);

          alert('note edited successfully');
          this.shownAddedNote();
          this.resetForm();

        })
        .catch((error) => {
          console.log('Error while edit note:', error.message);
          alert('Something went wrong while edit the note. Please try again.');
        });
    } else {
      alert('invalid user or  edit properly');
      return;
    }
  }

  delNote(note: any): void {
    this.apiService
      .deleteNote(note.title)
      .then((response) => {
        this.userNotes = this.userNotes.filter((n) => n.title !== note.title);
        console.log(response.data);
        alert('Note deleted successfully');
      })
      .catch((error) => {
        alert(
          'Something went wrong while deleting the note. Please try again.'
        );
      });
  }


  resetForm(): void {
    this.homepageForm.reset(); 
  }
}
