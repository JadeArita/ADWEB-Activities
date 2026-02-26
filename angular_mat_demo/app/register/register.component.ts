import { DatePipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

export class Register {
  userName: string = '';
  email: string = '';
  password: string = '';
  gender: string = '';
  birthDate!: Date;
  address: string = '';
  angularSkillLevel: number = 5;
  submitted = false;
  minSkillLevel = 1;
  maxSkillLevel = 10;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends Register {
  private snackBar = inject(MatSnackBar);

  formdata: FormGroup = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl(null, [Validators.required]),
    address: new FormControl(''),
    angularSkillLevel: new FormControl(5)
  });

  /** Returns a 0–100 value for the password strength progress bar */
  get passwordStrength(): number {
    const pw: string = this.formdata.get('password')?.value ?? '';
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8)  score += 40;
    if (/[A-Z]/.test(pw)) score += 20;
    if (/[0-9]/.test(pw)) score += 20;
    if (/[^A-Za-z0-9]/.test(pw)) score += 20;
    return score;
  }

  /** Returns a label for the strength bar */
  get passwordStrengthLabel(): string {
    const s = this.passwordStrength;
    if (s === 0)   return '';
    if (s <= 40)   return 'Weak';
    if (s <= 60)   return 'Fair';
    if (s <= 80)   return 'Good';
    return 'Strong';
  }

  /** Returns a color for the strength bar */
  get passwordStrengthColor(): 'warn' | 'accent' | 'primary' {
    const s = this.passwordStrength;
    if (s <= 40) return 'warn';
    if (s <= 80) return 'accent';
    return 'primary';
  }

  onClickSubmit(data: {
    userName: string;
    email: string;
    password: string;
    gender: string;
    address: string;
    birthDate: Date;
    angularSkillLevel: number;
  }) {
    this.submitted = true;
    this.userName = data.userName;
    this.email = data.email;
    this.password = data.password;
    this.gender = data.gender;
    this.address = data.address;
    this.angularSkillLevel = data.angularSkillLevel;
    this.birthDate = data.birthDate;

    if (this.formdata.valid) {
      console.log('Form Submitted!', this.formdata.value);
      this.snackBar.open('✓ Registration successful! Welcome, ' + (data.userName || data.email), 'Dismiss', {
        duration: 4000,
        panelClass: ['snack-success']
      });
    } else {
      console.log('Form is not valid!');
      this.snackBar.open('✕ Please complete all required fields.', 'Dismiss', {
        duration: 3500,
        panelClass: ['snack-error']
      });
    }
  }
}
