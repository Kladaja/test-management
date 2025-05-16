import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RequirementService } from '../../../shared/services/requirement.service';
import { TestcaseService } from '../../../shared/services/testcase.service';
import { Requirement } from '../../../shared/model/Requirement';
import { Testcase } from '../../../shared/model/Testcase';

@Component({
  selector: 'app-requirement-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule
  ],
  templateUrl: './requirement-details.component.html',
  styleUrl: './requirement-details.component.scss'
})
export class RequirementDetailsComponent implements OnInit {
  requirement: Requirement | null = null;
  testcases: Testcase[] = [];
  displayedColumns: string[] = ['title', 'expectedResult', 'createdBy', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private requirementService: RequirementService,
    private testcaseService: TestcaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.requirementService.getRequirementById(id).subscribe({
        next: (req) => {
          this.requirement = req;
          this.loadTestcases(id);
        },
        error: (err) => console.error('Error fetching requirement', err)
      });
    }
  }

  loadTestcases(requirementId: string) {
    this.testcaseService.getTestcasesByRequirement(requirementId).subscribe({
      next: (cases) => this.testcases = cases,
      error: (err) => console.error('Error loading test cases', err)
    });
  }

  navigateToTestcaseForm(): void {
    if (!this.requirement || !this.requirement.project) return;

    this.router.navigate(['/testcase-form'], {
      queryParams: {
        requirementId: this.requirement._id,
        projectId: this.requirement.project
      }
    });
  }

  viewTestcase(tc: Testcase): void {
    this.router.navigate(['/testcase-details', tc._id]);
  }

  updateTestcase(tc: string) {
    this.router.navigate(['/testcase-form', tc]);
  }

  deleteTestcase(tc: Testcase): void {
    if (confirm('Are you sure you want to delete this test case?')) {
      this.testcaseService.deleteTestcase(tc._id).subscribe({
        next: () => {
          this.testcases = [...this.testcases.filter(t => t._id !== t._id)];
        },
        error: (err) => console.error('Error deleting test case', err)
      });
    }
  }
}