import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-harvis-login',
  templateUrl: './harvis-login.component.html',
  styleUrls: ['./harvis-login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class HarvisLoginComponent {
  loginForm: FormGroup;
  submitted = false;
  error = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      pwd: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    if (this.loginForm.invalid) {
      return;
    }
    // Simulate login logic
    const { name, pwd } = this.loginForm.value;
    if (name === 'admin' && pwd === 'password123') {
      // Redirect to dashboard (home page)
      this.router.navigate(['home']);
    } else {
      this.error = 'Invalid name or password.';
    }
  }
} 