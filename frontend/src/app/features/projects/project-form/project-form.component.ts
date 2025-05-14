import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ProjectService } from '../../../shared/services/project.service';

@Component({
  selector: 'app-project-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  isEditMode = false;
  projectId?: string;

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private projectService: ProjectService) { }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.projectId = id;
        this.projectService.getProjectById(id).subscribe(project => {
          this.projectForm.patchValue({
            name: project.name,
            description: project.description
          });
        });
      }
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      if (!this.isEditMode) {
        this.projectService.addProject(this.projectForm.value).subscribe({
          next: () => this.router.navigate(['/project-management']),
          error: (err) => console.log(err)
        });
      } else if (this.projectId) {
        this.projectService.updateProject(this.projectId, this.projectForm.value).subscribe({
          next: () => this.router.navigate(['/project-management']),
          error: (err) => console.log(err)
        });
      }
    } else {
      console.log('Form is not valid.');
    }
  }
}