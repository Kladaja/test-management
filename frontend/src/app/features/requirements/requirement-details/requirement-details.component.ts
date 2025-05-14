import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RequirementService } from '../../../shared/services/requirement.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { TestcaseService } from '../../../shared/services/testcase.service';
import { Requirement } from '../../../shared/model/Requirement';
import { TestCase } from '../../../shared/model/TestCase';

@Component({
  selector: 'app-requirement-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './requirement-details.component.html',
  styleUrl: './requirement-details.component.scss'
})
export class RequirementDetailsComponent implements OnInit {
  requirement: Requirement | null = null;
  testCases: TestCase[] = [];

  constructor(
    private route: ActivatedRoute,
    private requirementService: RequirementService,
    private testCaseService: TestcaseService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.requirementService.getRequirementById(id).subscribe({
        next: (req) => {
          this.requirement = req;
          this.loadTestCases(id);
        },
        error: (err) => console.error('Error fetching requirement', err)
      });
    }
  }

  loadTestCases(requirementId: string) {
    this.testCaseService.getByRequirement(requirementId).subscribe({
      next: (cases) => this.testCases = cases,
      error: (err) => console.error('Error loading test cases', err)
    });
  }
}