import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  ticket = {
    subject: '',
    description: '',
    category: '',
    priority: ''
  };
  tickets: any[] = [];
  displayedColumns: string[] = ['subject', 'status'];

  constructor(private ticketsService: TicketsService) {}

  ngOnInit() {
    this.loadTickets();
  }

  createTicket() {
    this.ticketsService.createTicket(this.ticket).subscribe(
      (response) => {
        console.log('Ticket creado:', response);
        this.loadTickets();
        this.ticket = { subject: '', description: '', category: '', priority: '' };
      },
      (error) => console.error('Error al crear ticket:', error)
    );
  }

  loadTickets() {
    this.ticketsService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
      },
      (error) => console.error('Error al obtener tickets:', error)
    );
  }
}
