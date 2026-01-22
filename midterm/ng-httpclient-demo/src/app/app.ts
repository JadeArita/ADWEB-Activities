import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Httpclient } from './httpclient';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  protected readonly title = signal('HTTP Client Programming');

  httpusers: User[] = [];
  tasks: any[] = []; // Array for the simplified challenge tasks

  constructor(private httpService: Httpclient) {}

  ngOnInit() {
    // 1. Fetch Users for Main Activity
    this.httpService.getUsersRemotely().subscribe((data) => {
      this.httpusers = data;
    });

    // 2. Fetch Tasks for Challenge Activity and limit to 5
    this.httpService.getTasksRemotely().subscribe((data) => {
      this.tasks = data.slice(0, 5);
    });
  }
}
