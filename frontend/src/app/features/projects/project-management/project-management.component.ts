import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
  ],
  templateUrl: './project-management.component.html',
  styleUrl: './project-management.component.scss'
})
export class ProjectManagementComponent {
  projects?: Project[];
  displayedColumns: string[] = ['name', 'description', 'createdBy'];

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) { }

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

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}