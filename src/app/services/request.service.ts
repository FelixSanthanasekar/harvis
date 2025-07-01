import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Request {
  id: number;
  clientName: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  date: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private requests: Request[] = [
    {
      id: 1,
      clientName: 'John Smith',
      title: 'Computer not starting',
      category: 'Hardware',
      priority: 'High',
      status: 'Open',
      date: '2024-03-20',
      description: 'Computer fails to boot up, shows blue screen'
    },
    {
      id: 2,
      clientName: 'Sarah Johnson',
      title: 'Email access issues',
      category: 'Software',
      priority: 'Medium',
      status: 'In Progress',
      date: '2024-03-19',
      description: 'Unable to access Outlook, getting error message'
    },
    {
      id: 3,
      clientName: 'Michael Brown',
      title: 'Network connectivity',
      category: 'Network',
      priority: 'Urgent',
      status: 'Open',
      date: '2024-03-20',
      description: 'No internet connection in the office'
    }
  ];

  private selectedRequest = new BehaviorSubject<Request | null>(null);

  constructor() { }

  getRequests(): Observable<Request[]> {
    return of(this.requests);
  }

  getRequestById(id: number): Observable<Request | undefined> {
    const request = this.requests.find(request => request.id === id);
    return of(request);
  }

  setSelectedRequest(request: Request | null) {
    this.selectedRequest.next(request);
  }

  getSelectedRequest(): Observable<Request | null> {
    return this.selectedRequest.asObservable();
  }

  updateRequest(updatedRequest: Request): Observable<void> {
    const index = this.requests.findIndex(request => request.id === updatedRequest.id);
    if (index !== -1) {
      this.requests[index] = updatedRequest;
    }
    return of(void 0);
  }

  getNextId(): number {
    const maxId = Math.max(...this.requests.map(request => request.id), 0);
    return maxId + 1;
  }

  addRequest(request: Request): Observable<void> {
    this.requests.push(request);
    return of(void 0);
  }
} 