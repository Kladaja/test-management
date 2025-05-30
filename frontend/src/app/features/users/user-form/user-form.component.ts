import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/model/User';

@Component({
  selector: 'app-user-form',
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
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  user: User | null = null;
  userForm!: FormGroup;
  isEditMode = false;
  userId?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.route.paramMap.subscribe(params => {
          const id = params.get('id');
          if (id) {
            this.isEditMode = true;
            this.userId = id;
            this.userService.getUserById(id).subscribe(user => {
              this.initForm(user);
            });
          } else {
            this.initForm();
          }
        });
      },
      error: () => {
        this.user = null;
      }
    });
  }

  get isManager(): boolean {
    return this.user?.role === 'manager';
  }

  initForm(user?: any) {
    this.userForm = this.formBuilder.group({
      email: [user?.email || '', [Validators.required, Validators.email]],
      firstName: [user?.firstName || ''],
      lastName: [user?.lastName || ''],
      password: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', this.isEditMode ? [] : [Validators.required]],
      role: [user?.role]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.getRawValue();;
      if (!this.isEditMode) {
        this.authService.register(formValue).subscribe({
          next: () => this.router.navigate(['/user-management']),
          error: (err) => console.log(err)
        });
      }
      else if (this.userId) {
        let updateData: any = {
          email: formValue.email,
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          role: formValue.role
        };
        if (formValue.password) {
          updateData['password'] = formValue.password;
        }
        this.userService.updateUser(this.userId, updateData).subscribe({
          next: () => {
            if (this.userForm.value.role === 'manager') {
              this.router.navigate(['/user-management']);
            } else {
              this.userService.getCurrentUser().subscribe({
                next: (user) => {
                  this.router.navigate(['/user-profile']);
                }
              });
            }
          },
          error: (err) => console.log(err)
        });
      }
    } else {
      console.log('Form is not valid: ', this.userForm.errors);
    }
  }
}