import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from '../shared/model/Project';
import { ProjectService } from '../shared/services/project.service';

@Component({
  selector: 'app-project-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-management.component.html',
  styleUrl: './project-management.component.scss'
})
export class ProjectManagementComponent {
  projects?: Project[];

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
}