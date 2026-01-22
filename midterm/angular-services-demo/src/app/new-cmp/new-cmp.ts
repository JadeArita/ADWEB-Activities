import { Component } from '@angular/core';
import { Myservice } from '../myservice';

@Component({
  selector: 'app-new-cmp',
  imports: [],
  templateUrl: './new-cmp.html',
  styleUrl: './new-cmp.css',
})
export class NewCmp {
  todaydate;
  componentproperty;
  newcomponent = 'Entered in new component!'
  constructor(private myservice:Myservice) {
      this.todaydate = this.myservice.showTodayDate()
      this.myservice.serviceproperty = 'Component Value Changed!'
      this.componentproperty = this.myservice.serviceproperty;
    }
}
