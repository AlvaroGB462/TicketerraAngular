import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private apiUrl = 'http://localhost:8081/tickets';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ver`);
  }

  createTicket(ticket: { subject: string; description: string; category: string; priority: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, ticket);
  }
}
