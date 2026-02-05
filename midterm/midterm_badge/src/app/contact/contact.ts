import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../truncate.pipe';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TruncatePipe],
  templateUrl: './contact.html'
})
export class ContactComponent {
  // Define properties for [(ngModel)] binding
  userName: string = '';
  userEmail: string = '';
  userSubject: string = '';
  userMessage: string = '';

  submitForm() {
    alert('Form Submitted Successfully!');
  }
}
