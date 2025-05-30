import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../services/auth.service';
import { User } from '../../model/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  user: User | null = null;
  loggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.loggedIn$ = this.authService.loggedIn$;
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => this.user = user,
      error: () => this.user = null
    });
  }

  get isManager(): boolean {
    return this.user?.role === 'manager';
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
      error: (err) => console.error(err)
    });
  }
}