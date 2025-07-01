import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent {
  title = 'Welcome to Harvis';
  description = 'Your one-stop solution for technical support and help desk management.';

  // Request Statistics
  totalRequests = 156;
  openRequests = 42;
  inProgressRequests = 38;
  closedRequests = 76;

  // Monthly Statistics
  monthlyStats = [
    { month: 'Jan', new: 85, resolved: 65 },
    { month: 'Feb', new: 75, resolved: 70 },
    { month: 'Mar', new: 90, resolved: 80 },
    { month: 'Apr', new: 65, resolved: 60 },
    { month: 'May', new: 95, resolved: 85 },
    { month: 'Jun', new: 80, resolved: 75 }
  ];

  // Priority Distribution
  priorityStats = [
    { priority: 'High', count: 35, color: '#ef4444' },
    { priority: 'Medium', count: 45, color: '#f97316' },
    { priority: 'Low', count: 20, color: '#22c55e' }
  ];
} 