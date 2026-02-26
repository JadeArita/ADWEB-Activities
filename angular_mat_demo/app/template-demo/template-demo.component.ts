import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-demo',
  imports: [FormsModule],
  templateUrl: './template-demo.component.html',
  styleUrl: './template-demo.component.css',
})

export class TemplateDemo {
  // Existing Fields
  username = '';
  email = '';
  password = '';
  role = '';
  gender = '';
  status = '';
  comments = '';

  // New Fields
  phone = '';
  dob = '';
  country = '';

  // Popup Control
  showConfirmation = false;

  onSubmit() {
    // Show the confirmation popup
    this.showConfirmation = true;

    // Optional: Hide the popup automatically after 3 seconds
    setTimeout(() => {
      this.showConfirmation = false;
    }, 3000);

    console.log('Form Submitted!', {
      user: this.username,
      email: this.email,
      phone: this.phone,
      dob: this.dob,
      country: this.country
    });
  }
}
