import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-harvis-signup',
  templateUrl: './harvis-signup.component.html',
  styleUrls: ['./harvis-signup.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class HarvisSignUpComponent {
  signupForm: FormGroup;
  submitted = false;
  error = '';
  success = false;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      confirmPwd: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  get f() { return this.signupForm.controls; }

  passwordsMatchValidator(form: FormGroup) {
    return form.get('pwd')?.value === form.get('confirmPwd')?.value ? null : { mismatch: true };
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.success = false;
    if (this.signupForm.invalid) {
      if (this.signupForm.errors?.['mismatch']) {
        this.error = 'Passwords do not match.';
      }
      return;
    }
    // Simulate sign up logic
    this.success = true;
    this.signupForm.reset();
    this.submitted = false;
  }
} 