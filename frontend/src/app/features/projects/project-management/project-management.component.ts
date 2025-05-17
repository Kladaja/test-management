import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Project } from '../../../shared/model/Project';
import { ProjectService } from '../../../shared/services/project.service';
import { User } from '../../../shared/model/User';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-project-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './project-management.component.html',
  styleUrl: './project-management.component.scss',
})
export class ProjectManagementComponent {
  user: User | null = null;
  projects?: Project[];
  displayedColumns: string[] = ['name', 'description', 'createdBy', 'actions'];

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.projectService.getAll().subscribe({
          next: (data) => {
            if (this.user?.role === 'manager') {
              this.projects = data;
            } else {
              this.projects = data.filter(project =>
                project.testers.some(tester => tester._id === this.user?._id)
              );
            }
          },
          error: (err) => console.error(err),
        });
      },
      error: () => this.user = null
    });
  }

  get isManager(): boolean {
    return this.user?.role === 'manager';
  }

  viewProject(projectId: string) {
    this.router.navigate(['/project-details', projectId]);
  }

  updateProject(projectId: string) {
    this.router.navigate(['/project-form', projectId]);
  }

  deleteProject(projectId: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(projectId).subscribe({
        next: () => {
          this.projects = this.projects?.filter((r) => r._id !== projectId);
        },
        error: (err) => console.error('Error deleting project', err),
      });
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}