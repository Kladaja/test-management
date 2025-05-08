import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/model/User';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Error fetching user', err)
    });
  }
}
