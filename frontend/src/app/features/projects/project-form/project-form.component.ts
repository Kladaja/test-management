import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatError } from '@angular/material/form-field';

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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private projectService: ProjectService,
  ) { }

  ngOnInit() {
    if (!this.isEditMode) {
      this.projectForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['']
      });
    }
  }

  onSubmit() {
    if (this.projectForm.valid) {
      if (!this.isEditMode) {
        this.projectService.createProject(this.projectForm.value).subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['/project-management']);
          }, error: (err) => {
            console.log(this.projectForm.value);
            console.log(err);
          }
        });
      } else {

      }
    } else {
      console.log('Form is not valid.');
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}