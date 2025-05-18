import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Testcycle } from '../../../shared/model/Testcycle';
import { TestcycleService } from '../../../shared/services/testcycle.service';
import { User } from '../../../shared/model/User';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-testcycle-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './testcycle-management.component.html',
  styleUrl: './testcycle-management.component.scss'
})
export class TestcycleManagementComponent {
  user: User | null = null;
  testcycles?: Testcycle[];
  displayedColumns: string[] = ['name', 'description', 'project', 'actions'];

  constructor(
    private testcycleService: TestcycleService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.testcycleService.getAll().subscribe({
          next: (data) => {
            this.testcycles = data.filter(tc =>
              tc?.project?.testers?.some(tester => tester._id === this.user?._id)
            );
            console.log("onInit: ", this.testcycles)
          },
          error: (err) => console.error('Error fetching test cycles', err)
        });
      },
      error: (err) => console.error('Error fetching user', err)
    });
  }

  viewTestcycle(testcycleId: string) {
    this.router.navigate(['/testcycle-details', testcycleId]);
  }

  updateTestcycle(testcycleId: string) {
    this.router.navigate(['/testcycle-form', testcycleId]);
  }

  deleteTestcycle(testcycleId: string) {
    if (confirm('Are you sure you want to delete this testcycle?')) {
      this.testcycleService.deleteTestcycle(testcycleId).subscribe({
        next: () => {
          this.testcycles = this.testcycles?.filter(r => r._id !== testcycleId);
        },
        error: (err) => console.error('Error deleting requirement', err)
      });
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}