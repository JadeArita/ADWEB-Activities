import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.css'
})
export class CustomForm {
  jobForm: FormGroup;
  submittedInfo: any = null;

  positions = ['Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'Project Manager'];

  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      position: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      expectedSalary: ['', Validators.required],
      availability: ['', Validators.required], // Immediate, 1 Month, etc.
      portfolioUrl: ['', Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)],
      coverLetter: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
      this.submittedInfo = this.jobForm.value;
    } else {
      this.jobForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.jobForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
}
