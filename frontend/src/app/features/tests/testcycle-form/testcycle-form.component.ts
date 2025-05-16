import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { TestcycleService } from '../../../shared/services/testcycle.service';
import { Testcycle } from '../../../shared/model/Testcycle';
import { ProjectService } from '../../../shared/services/project.service';
import { Project } from '../../../shared/model/Project';

@Component({
  selector: 'app-testcycle-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './testcycle-form.component.html',
  styleUrls: ['./testcycle-form.component.scss']
})
export class TestcycleFormComponent implements OnInit {
  testcycleForm!: FormGroup;
  isEditMode = false;
  testcycleId?: string;
  projects: Project[] = [];
  selectedProjectName?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private testcycleService: TestcycleService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.testcycleForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      projectId: ['', Validators.required]
    });
    this.projectService.getAll().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error('Error loading projects:', err)
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.testcycleId = id;
        this.testcycleService.getTestcycleById(id).subscribe(testcycle => {
          this.testcycleForm.patchValue({
            name: testcycle.name,
            description: testcycle.description,
            projectId: testcycle.project?._id || ''
          });
          this.selectedProjectName = testcycle.project?.name;
          this.testcycleForm.get('projectId')?.disable();
        });
      }
    });
  }

  onSubmit() {
    if (this.testcycleForm.valid) {
      const formValue = this.testcycleForm.getRawValue();
      if (!this.isEditMode) {
        this.testcycleService.addTestcycle({
          name: formValue.name,
          description: formValue.description,
          projectId: formValue.projectId
        }).subscribe({
          next: () => this.router.navigate(['/testcycle-management']),
          error: (err) => console.log(err)
        });
      } else if (this.testcycleId) {
        console.log(formValue)
        this.testcycleService.updateTestcycle(this.testcycleId, {
          _id: this.testcycleId,
          name: formValue.name,
          description: formValue.description,
          project: formValue.projectId
        } as Testcycle).subscribe({
          next: () => this.router.navigate(['/testcycle-management']),
          error: (err) => console.log(err)
        });
      }
    } else {
      console.log('Form is not valid.');
    }
  }
}