import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from './data.service'; // Use the new service

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  today = new Date();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // This triggers the global fetch
    this.dataService.posts$.subscribe();
  }
}
