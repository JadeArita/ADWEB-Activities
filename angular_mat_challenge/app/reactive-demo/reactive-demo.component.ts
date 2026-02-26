import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive-demo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-demo.component.html',
  styleUrl: './reactive-demo.component.css',
})


export class ReactiveDemo {
  roles = ['Admin', 'User', 'Guest'];
  form: FormGroup;
  submittedData: any = null;

  constructor(private fb: FormBuilder) {
    // Update your constructor group
this.form = this.fb.group({
  username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]{4,12}$/)]],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
  role: ['', Validators.required], // Empty for "Select Role"
  gender: ['', Validators.required], // Empty for no pre-selection
  status: ['', Validators.required], // Empty for no pre-selection
  comments: [''],
  phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
  dob: ['', Validators.required],
  country: ['', Validators.required]
});
  }

  onSubmit() {
    if (this.form.valid) {
      this.submittedData = this.form.value;
    } else {
      this.form.markAllAsTouched();
    }
  }

  isInvalid(name: string) {
  const control = this.form.get(name);
  return control?.touched && control?.invalid;
}
}
