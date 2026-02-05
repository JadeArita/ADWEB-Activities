import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Fetch from API but map to English content
  public posts$: Observable<Post[]> = this.http.get<Post[]>(this.apiUrl).pipe(
    map(posts => posts.map(p => ({
      id: p.id,
      title: `Service Ticket #${p.id}: Support Request`,
      body: `This is an official community help desk record regarding technical assistance for ticket reference ${p.id}.`
    }))),
    shareReplay(1)
  );
}
