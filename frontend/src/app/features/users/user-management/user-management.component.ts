import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { User } from '../../../shared/model/User';
import { UserService } from '../../../shared/services/user.service';
import { Project } from '../../../shared/model/Project';
import { ProjectService } from '../../../shared/services/project.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent {
  users?: User[];
  allProjects: Project[] = [];
  displayedColumns: string[] = ['email', 'role', 'projects', 'actions'];

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (users) => {
        this.projectService.getAll().subscribe({
          next: (projects) => {
            // Csak azok a projektek, ahol a user szerepel a testers tömbben
            this.users = users.map(user => {
              const userProjects = projects.filter(p =>
                p.testers?.some(t => t._id === user._id)
              );
              return {
                ...user,
                projects: userProjects,
                projectNames: userProjects.map(p => p.name).join(', ')
              };
            });
          },
          error: (err) => console.error('Error loading projects', err)
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  viewUser(userId: string) {
    this.router.navigate(['/user-profile', userId]);
  }

  updateUser(userId: string) {
    this.router.navigate(['/user-form', userId]);
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users?.filter((u) => u._id !== userId);
        },
        error: (err) => console.error('Error deleting user', err),
      });
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}