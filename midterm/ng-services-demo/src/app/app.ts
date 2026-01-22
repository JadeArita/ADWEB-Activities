import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DecimalPipe } from '@angular/common'; // Import this
import { Employee } from './employee';
import { Products } from './products';

@Component({
  selector: 'app-root',
  // Add DecimalPipe to imports
  imports: [RouterOutlet, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit { // Add 'implements OnInit'
  protected readonly title = signal('ng-services-demo');

  public employees: any[] = [];
  public products: any[] = [];

  constructor(
    private _employeeService: Employee,
    private _productsService: Products
  ) {}

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    this.products = this._productsService.getProducts();
  }
}
