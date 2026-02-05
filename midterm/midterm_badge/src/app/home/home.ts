import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { TruncatePipe } from '../truncate.pipe';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './home.html'
})
export class HomeComponent {
  private dataService = inject(DataService);

  // Requirements: Use slice pipe or RxJS map to take first 5
  latestUpdates$ = this.dataService.posts$.pipe(
    map(posts => posts.slice(0, 5))
  );
}
