import { AsyncPipe, DatePipe, UpperCasePipe, CurrencyPipe, SlicePipe, DecimalPipe, PercentPipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pipes-demo',
  imports: [DatePipe, UpperCasePipe, AsyncPipe, CurrencyPipe, SlicePipe, DecimalPipe, PercentPipe, JsonPipe, TitleCasePipe],
  templateUrl: './pipes-demo.html',
  styleUrl: './pipes-demo.css',
})
export class PipesDemo {
  presentDate = new Date();
  price: number = 20000;
  Fruits = ["Apple", "Orange", "Grapes", "Mango", "Kiwi", "Pomegranade"];
  decimalNum1: number = 8.7589623;
  decimalNum2: number = 5.43;
  numValue: number = 0.95;
  userObject = {
    name: 'john doe',
    age: 25,
    city: 'new york'
  };
  studentData = {
    id: 101,
    name: 'Pac-Man',
    score: 5000,
    items: ['Power Pellet', 'Cherry', 'Ghost']
  };

  time$ = interval(1000).pipe(
    map(() => new Date())
  )
}
