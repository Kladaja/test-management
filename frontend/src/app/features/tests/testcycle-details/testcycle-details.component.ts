import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TestcycleService } from '../../../shared/services/testcycle.service';
import { TestcaseService } from '../../../shared/services/testcase.service';
import { Testcycle } from '../../../shared/model/Testcycle';
import { Testcase } from '../../../shared/model/Testcase';

@Component({
  selector: 'app-testcycle-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule
  ],
  templateUrl: './testcycle-details.component.html',
  styleUrl: './testcycle-details.component.scss'
})
export class TestcycleDetailsComponent implements OnInit {
  testcycle: Testcycle | null = null;
  testcases: Testcase[] = [];
  allProjectTestcases: Testcase[] = [];

  displayedColumns: string[] = ['title', 'expectedResult', 'status', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private testcycleService: TestcycleService,
    private testcaseService: TestcaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.testcycleService.getTestcycleById(id).subscribe({
        next: (tc) => {
          this.testcycle = tc;
          this.loadTestcases(id);
          if (tc.project) {
            this.loadAllProjectTestcases(tc.project._id);
          }
        },
        error: (err) => console.error('Error fetching testcycle', err)
      });
    }
  }

  loadTestcases(testcycleId: string) {
    console.log("TC: ", testcycleId)
    this.testcaseService.getTestcasesByTestcycle(testcycleId).subscribe({
      next: (cases) => this.testcases = cases,
      error: (err) => console.error('Error loading test cases', err)
    });
  }

  loadAllProjectTestcases(projectId: string): void {
    this.testcaseService.getTestcasesByProject(projectId).subscribe({
      next: (cases) => {
        this.allProjectTestcases = cases;
        console.log(cases)
      },
      error: (err) => console.error('Error loading all project testcases', err)
    });
  }

  isLinkedToCycle(tc: Testcase): boolean {
    return this.testcases.some(t => t._id === tc._id);
  }

  toggleTestcaseInCycle(tc: Testcase): void {
    if (!this.testcycle) return;

    if (this.isLinkedToCycle(tc)) {
      this.testcaseService.removeTestcaseFromTestcycle(tc._id, this.testcycle._id).subscribe({
        next: () => {
          this.testcases = this.testcases.filter(t => t._id !== tc._id);
        },
        error: (err) => console.error('Error unlinking testcase from testcycle', err)
      });
    } else {
      this.testcaseService.addTestcaseToTestcycle(tc._id, this.testcycle._id).subscribe({
        next: () => {
          this.testcases.push(tc);
        },
        error: (err) => console.error('Error linking testcase to testcycle', err)
      });
    }
  }

  viewTestcase(tc: Testcase): void {
    this.router.navigate(['/testcase-details', tc._id]);
  }
}