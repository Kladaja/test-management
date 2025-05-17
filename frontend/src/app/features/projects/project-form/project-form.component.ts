import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { ProjectService } from '../../../shared/services/project.service';
import { User } from '../../../shared/model/User';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-project-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatChipsModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  allUsers: User[] = [];
  filteredUsers: User[] = [];
  selectedTesters: User[] = [];
  searchTerm: string = '';
  isEditMode = false;
  projectId?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getAll().subscribe(users => {
      this.allUsers = users;
      this.filteredUsers = [];
    });
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      testers: [[]],
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.projectId = id;
        this.projectService.getProjectById(id).subscribe(project => {
          this.selectedTesters = project.testers;
          this.projectForm.patchValue({
            name: project.name,
            description: project.description,
            testers: project.testers.map((user: User) => user._id)
          });
        });
      }
    });
  }

  onSearch(term: string) {
    if (!term.trim()) {
      this.filteredUsers = [];
      return;
    }
    this.filteredUsers = this.allUsers.filter(user =>
      (user.firstName + ' ' + user.lastName + ' ' + user.email)
        .toLowerCase()
        .includes(term.toLowerCase())
    );
  }

  addTester(user: User) {
    if (!this.selectedTesters.some(t => t._id === user._id)) {
      this.selectedTesters.push(user);
      this.projectForm.get('testers')?.setValue(this.selectedTesters.map(u => u._id));
    }
  }

  removeTester(user: User) {
    this.selectedTesters = this.selectedTesters.filter(t => t._id !== user._id);
    this.projectForm.get('testers')?.setValue(this.selectedTesters.map(u => u._id));
  }

  onSubmit() {
    console.log(this.projectForm.value);
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