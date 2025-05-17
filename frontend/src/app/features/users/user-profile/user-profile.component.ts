import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/model/User';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (user) => this.user = user,
        error: (err) => console.error('Hiba a felhasználó betöltésekor:', err)
      });
    } else {
      this.userService.getCurrentUser().subscribe({
        next: (user) => this.user = user,
        error: (err) => console.error('Hiba az aktuális felhasználó betöltésekor:', err)
      });
    }
  }

  updateUser(userId: string) {
    this.router.navigate(['/user-form', userId]);
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}