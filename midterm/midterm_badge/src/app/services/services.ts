import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { TruncatePipe } from '../truncate.pipe';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TruncatePipe],
  templateUrl: './services.html'
})
export class ServicesComponent {
  private dataService = inject(DataService);
  searchControl = new FormControl('', { nonNullable: true });

  filteredPosts$ = combineLatest([
    this.dataService.posts$,
    this.searchControl.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(([posts, term]) => {
      const search = term.toLowerCase();
      return posts.filter(p => p.title.toLowerCase().includes(search) || p.body.toLowerCase().includes(search));
    })
  );
}
