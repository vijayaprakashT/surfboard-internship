import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../app-service-.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app-profile.component.html',
  styleUrls: ['./app-profile.component.css'], // Fixed property name
})
export class AppProfileComponent implements OnInit {
  user: any = {};

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.userInfo();
  }

  userInfo(): void {
    this.apiService
      .getUser()
      .then((response) => {
        this.user = response.data;
        console.log('Profile info fetched:', this.user);
        alert('User details fetched successfully');
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      });
  }
}
