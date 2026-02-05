import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="max-width: 800px; margin: 40px auto; padding: 20px;">
      <h1 style="color: #001F3F;">{{ 'About Our Community' | uppercase }}</h1>
      <p><strong>CommunityConnect</strong> connects you with support resources and solutions.</p>

      <div style="margin-top: 20px; padding: 15px; background: #eee;">
        <p>Current Portal Date: {{ today | date:'fullDate' }}</p>
      </div>
    </div>
  `
})
export class AboutComponent {
  today: Date = new Date(); // This solves TS2339
}
