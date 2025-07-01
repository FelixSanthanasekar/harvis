import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import type { Request } from '../../services/request.service';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EditRequestComponent implements OnInit {
  title = 'Edit Request';
  description = 'Update the request details below.';
  
  request: Request = {
    id: 0,
    clientName: '',
    title: '',
    category: '',
    priority: '',
    status: '',
    date: '',
    description: ''
  };

  categories = ['Hardware', 'Software', 'Network', 'Other'];
  priorities = ['High', 'Medium', 'Low'];
  statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.requestService.getRequestById(id).subscribe(request => {
      if (request) {
        this.request = request;
      }
    });
  }

  onSubmit(): void {
    this.requestService.updateRequest(this.request).subscribe({
      next: () => {
        this.router.navigate(['/request-list']);
      },
      error: (error) => {
        console.error('Error updating request:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/request-list']);
  }
} 