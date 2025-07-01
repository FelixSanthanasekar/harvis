import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import type { Request } from '../../services/request.service';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AddRequestComponent {
  title = 'Submit New Request';
  description = 'Fill out the form below to submit a new support request.';
  
  request: Partial<Request> = {
    clientName: '',
    title: '',
    category: '',
    priority: '',
    status: 'Open',
    description: '',
    date: new Date().toISOString().split('T')[0]
  };

  categories = ['Hardware', 'Software', 'Network', 'Other'];
  priorities = ['High', 'Medium', 'Low'];

  constructor(
    private router: Router,
    private requestService: RequestService
  ) {}

  onSubmit(): void {
    const newRequest: Request = {
      id: this.requestService.getNextId(),
      clientName: this.request.clientName || '',
      title: this.request.title || '',
      category: this.request.category || '',
      priority: this.request.priority || '',
      status: this.request.status || 'Open',
      description: this.request.description || '',
      date: this.request.date || new Date().toISOString().split('T')[0]
    };

    this.requestService.addRequest(newRequest).subscribe({
      next: () => {
        this.router.navigate(['/request-list']);
      },
      error: (error) => {
        console.error('Error adding request:', error);
      }
    });
  }
} 