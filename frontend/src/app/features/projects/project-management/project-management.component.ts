import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { Project } from '../../../shared/model/Project';
import { ProjectService } from '../../../shared/services/project.service';

@Component({
  selector: 'app-project-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './project-management.component.html',
  styleUrl: './project-management.component.scss'
})
export class ProjectManagementComponent {
  projects?: Project[];
  displayedColumns: string[] = ['name', 'description', 'createdBy', 'actions'];

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.projectService.getAll().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  viewProject(projectId: string) {
    this.router.navigate(['/project-details', projectId]);
  }

  editProject(projectId: string) {
    this.router.navigate(['/project-form', projectId]);
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}