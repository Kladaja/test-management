import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TestcaseService } from '../../../shared/services/testcase.service';
import { Testcase } from '../../../shared/model/Testcase';

@Component({
  selector: 'app-testcase-details',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule
  ],
  templateUrl: './testcase-details.component.html',
  styleUrl: './testcase-details.component.scss'
})
export class TestcaseDetailsComponent implements OnInit {
  testcase: Testcase | null = null;
  displayedColumns: string[] = ['index', 'step'];
  stepDataSource: { step: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private testcaseService: TestcaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.testcaseService.getTestcaseById(id).subscribe({
        next: (req) => {
          this.testcase = req;
          let steps: string[] = [];
          if (req.steps.length === 1 && typeof req.steps[0] === 'string') {
            try {
              steps = JSON.parse(req.steps[0]);
            } catch (e) {
              console.error('Invalid step format:', req.steps[0]);
            }
          } else {
            steps = req.steps;
          }

          this.stepDataSource = steps.map(step => ({ step }));
          console.log(this.stepDataSource);
        },
        error: (err) => console.error(err)
      });
    }
  }

  updateTestcase(tc: string) {
    // this.router.navigate(['/project-form', tc]);
  }

  deleteTestcase(tc: string): void {
    if (confirm('Are you sure you want to delete this test case?')) {
      /*
      this.requirementService.deleteRequirement(req._id).subscribe({
        next: () => {
          this.requirements = this.requirements.filter(r => r._id !== req._id);
        },
        error: (err) => console.error('Error deleting requirement', err)
      });
      */
    }
  }
}
