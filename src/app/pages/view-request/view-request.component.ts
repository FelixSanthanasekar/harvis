import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import type { Request } from '../../services/request.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ViewRequestComponent implements OnInit {
  title = 'Request Details';
  description = 'View the complete details of this support request.';
  
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

  goBack(): void {
    this.router.navigate(['/request-list']);
  }

  editRequest(): void {
    this.router.navigate(['/edit-request', this.request.id]);
  }
} 