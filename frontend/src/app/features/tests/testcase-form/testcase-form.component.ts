import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatError, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { TestcaseService } from '../../../shared/services/testcase.service';

@Component({
  selector: 'app-testcase-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatError
  ],
  templateUrl: './testcase-form.component.html',
  styleUrls: ['./testcase-form.component.scss']
})
export class TestcaseFormComponent implements OnInit {
  testcaseForm!: FormGroup;
  isEditMode = false;
  testcaseId?: string;
  requirementId!: string;
  projectId!: string;
  dataSource = new MatTableDataSource<FormControl>();
  displayedColumns: string[] = ['index', 'step', 'remove'];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private testcaseService: TestcaseService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.requirementId = params.get('requirementId') || '';
      this.projectId = params.get('projectId') || '';

      this.testcaseForm = this.fb.group({
        title: ['', Validators.required],
        description: [''],
        expectedResult: ['', Validators.required],
        steps: this.fb.array([]),
        requirement: [this.requirementId, Validators.required],
        project: [this.projectId, Validators.required]
      });

      this.addStep();
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.testcaseId = id;
        // TODO: Fetch testcase by ID and populate form
      }
    });
  }


  get steps(): FormArray {
    return this.testcaseForm.get('steps') as FormArray;
  }

  addStep(): void {
    this.steps.push(this.fb.control('', Validators.required));
    this.updateTableData();
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
    this.updateTableData();
  }

  updateTableData(): void {
    this.dataSource.data = this.steps.controls as FormControl[];
  }

  onSubmit(): void {
    if (this.testcaseForm.invalid) { return; }
    const formValue = {
      ...this.testcaseForm.value,
      steps: this.steps.value.map((s: string) => s.trim()),
      requirement: this.requirementId,
      project: this.projectId
    };
    if (this.isEditMode && this.testcaseId) {
      // TODO: Implement update in the service
    } else {
      this.testcaseService.addTestcase(formValue, this.requirementId, this.projectId).subscribe({
        next: () => this.router.navigate(['/requirements', this.requirementId]),
        error: err => console.error(err)
      });
    }
  }
}