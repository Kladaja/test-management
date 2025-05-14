import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ProjectService } from '../../../shared/services/project.service';
import { Project } from '../../../shared/model/Project';
import { RequirementService } from '../../../shared/services/requirement.service';
import { Requirement } from '../../../shared/model/Requirement';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | null = null;
  requirements: Requirement[] = [];
  newRequirement = { description: '' };
  editingRequirementId: string | null = null;
  editedDescription: string = '';

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private requirementService: RequirementService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectService.getProjectById(id).subscribe({
        next: (data) => {
          this.project = data;
          this.loadRequirements();
        },
        error: (err) => console.error('Error fetching project', err)
      });
    }
  }

  loadRequirements(): void {
    if (!this.project) return;
    this.requirementService.getByProject(this.project._id).subscribe({
      next: (data) => this.requirements = data,
      error: (err) => console.error('Error fetching requirements', err)
    });
  }

  addRequirement(): void {
    if (!this.project || !this.newRequirement.description.trim()) return;
    this.requirementService.addRequirement(this.project._id, this.newRequirement.description.trim())
      .subscribe({
        next: (created) => {
          this.requirements = [...this.requirements, created];
          this.newRequirement = { description: '' };
        },
        error: (err) => console.error('Error adding requirement', err)
      });
  }

  updateProject(projectId: string) {
    this.router.navigate(['/project-form', projectId]);
  }

  viewRequirement(req: Requirement): void {
    this.router.navigate(['/requirement-details', req._id]);
  }

  editRequirement(req: Requirement): void {
    this.editingRequirementId = req._id;
    this.editedDescription = req.description;
  }

  updateRequirement(req: Requirement): void {
    if (!this.editedDescription.trim()) return;

    const updatedDescription = this.editedDescription.trim();

    this.requirementService.updateRequirement(req._id, updatedDescription).subscribe({
      next: (updatedReq) => {
        const index = this.requirements.findIndex(r => r._id === req._id);
        if (index !== -1) {
          this.requirements[index] = updatedReq;
        }
        this.editingRequirementId = null;
        this.editedDescription = '';
      },
      error: (err) => console.error('Error updating requirement', err)
    });
  }

  cancelEdit(): void {
    this.editingRequirementId = null;
    this.editedDescription = '';
  }

  deleteRequirement(req: Requirement): void {
    if (confirm('Are you sure you want to delete this requirement?')) {
      this.requirementService.deleteRequirement(req._id).subscribe({
        next: () => {
          this.requirements = this.requirements.filter(r => r._id !== req._id);
        },
        error: (err) => console.error('Error deleting requirement', err)
      });
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}