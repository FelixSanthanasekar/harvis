import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RequestService } from '../../services/request.service';
import type { Request } from '../../services/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class RequestListComponent implements OnInit {
  title = 'Support Requests';
  description = 'View and manage all support requests.';
  requests: Request[] = [];
  filteredRequests: Request[] = [];
  
  // Filter properties
  showFilterMenu = false;
  filterStatus = '';
  filterPriority = '';
  filterCategory = '';
  searchTerm = '';

  // Sort properties
  showSortMenu = false;
  sortField = 'date';
  sortDirection: 'asc' | 'desc' = 'desc';

  // Filter options
  statuses = ['Open', 'In Progress', 'Closed'];
  priorities = ['Low', 'Medium', 'High', 'Urgent'];
  categories = ['Hardware', 'Software', 'Network', 'Other'];

  constructor(
    private router: Router,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestService.getRequests().subscribe(requests => {
      this.requests = requests;
      this.applyFilters();
    });
  }

  viewRequest(id: number): void {
    this.router.navigate(['/view-request', id]);
  }

  editRequest(id: number): void {
    this.router.navigate(['/edit-request', id]);
  }

  addNewRequest(): void {
    this.router.navigate(['/add-request']);
  }

  toggleFilterMenu() {
    this.showFilterMenu = !this.showFilterMenu;
    if (this.showFilterMenu) {
      this.showSortMenu = false;
    }
  }

  toggleSortMenu() {
    this.showSortMenu = !this.showSortMenu;
    if (this.showSortMenu) {
      this.showFilterMenu = false;
    }
  }

  applyFilters() {
    this.filteredRequests = this.requests.filter(request => {
      const matchesStatus = !this.filterStatus || request.status === this.filterStatus;
      const matchesPriority = !this.filterPriority || request.priority === this.filterPriority;
      const matchesCategory = !this.filterCategory || request.category === this.filterCategory;
      const matchesSearch = !this.searchTerm || 
        request.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        request.clientName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        request.description?.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchesStatus && matchesPriority && matchesCategory && matchesSearch;
    });

    this.applySort();
  }

  clearFilters() {
    this.filterStatus = '';
    this.filterPriority = '';
    this.filterCategory = '';
    this.searchTerm = '';
    this.applyFilters();
  }

  applySort() {
    this.filteredRequests.sort((a, b) => {
      let comparison = 0;
      
      switch (this.sortField) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'priority':
          const priorityOrder: { [key: string]: number } = { 'Urgent': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'clientName':
          comparison = a.clientName.localeCompare(b.clientName);
          break;
        default:
          comparison = 0;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  setSort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applySort();
  }
} 