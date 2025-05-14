import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ProjectService } from '../../../shared/services/project.service';
import { Project } from '../../../shared/model/Project';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | null = null;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectService.getProjectById(id).subscribe({
        next: (data) => this.project = data,
        error: (err) => console.error('Error fetching project', err)
      });
    }
  }

  editProject(projectId: string) {
    this.router.navigate(['/project-form', projectId]);
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}