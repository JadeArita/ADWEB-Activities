import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';

// ─── Strongly-typed data model ────────────────────────────────────────────────
export interface SportsTournamentRegistration {
  // Participant
  fullName: string;
  email: string;
  contactNumber: string;
  dateOfBirth: Date | null;
  gender: string;
  address: string;

  // Tournament
  typeOfSport: string;
  category: string;
  participationType: string;
  teamName: string;
  numberOfTeamMembers: number | null;
  coachName: string;
  teamContactPerson: string;

  // Event Preferences
  preferredSchedule: string;
  jerseySize: string;

  // Medical
  bloodType: string;
  medicalConditions: string;
  emergencyContactName: string;
  emergencyContactNumber: string;

  // Agreement
  agreement: boolean;
}

// ─── Conditional team validator ───────────────────────────────────────────────
function teamFieldRequired(controlName: string): ValidatorFn {
  return (control: AbstractControl) => {
    const parent = control.parent;
    if (!parent) return null;
    const participationType = parent.get('participationType')?.value;
    if (participationType === 'Team' && !control.value) {
      return { required: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-sports-registration',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatIconModule,
    MatChipsModule,
    MatStepperModule,
    MatDividerModule,
  ],
  templateUrl: './sports-registration.component.html',
  styleUrl: './sports-registration.component.css',
})
export class SportsRegistrationComponent {
  private snackBar = inject(MatSnackBar);

  submitted = false;
  submittedData: SportsTournamentRegistration | null = null;

  // ─── Dropdown data ───────────────────────────────────────────────────────
  sports = [
    'Basketball', 'Volleyball', 'Badminton', 'Tennis', 'Table Tennis',
    'Football', 'Futsal', 'Swimming', 'Track and Field', 'Chess', 'Esports',
  ];

  categories = [
    'Junior Division', 'Senior Division', 'Open Category', 'Mixed Division',
  ];

  schedules = ['Morning', 'Afternoon', 'Evening'];

  jerseySizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  bloodTypes = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'];

  // ─── Reactive Form ───────────────────────────────────────────────────────
  form: FormGroup = new FormGroup({
    // Participant
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10,11}$/),
    ]),
    dateOfBirth: new FormControl<Date | null>(null, [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl(''),

    // Tournament
    typeOfSport: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    participationType: new FormControl('', [Validators.required]),
    teamName: new FormControl(''),
    numberOfTeamMembers: new FormControl<number | null>(null, [
      Validators.pattern(/^[0-9]+$/),
    ]),
    coachName: new FormControl(''),
    teamContactPerson: new FormControl(''),

    // Event Preferences
    preferredSchedule: new FormControl(''),
    jerseySize: new FormControl('', [Validators.required]),

    // Medical
    bloodType: new FormControl(''),
    medicalConditions: new FormControl(''),
    emergencyContactName: new FormControl('', [Validators.required]),
    emergencyContactNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10,11}$/),
    ]),

    // Agreement
    agreement: new FormControl(false, [Validators.requiredTrue]),
  });

  // ─── Helpers ─────────────────────────────────────────────────────────────
  get isTeam(): boolean {
    return this.form.get('participationType')?.value === 'Team';
  }

  isInvalid(name: string): boolean {
    const c = this.form.get(name);
    return !!(c?.invalid && c?.touched);
  }

  /** Re-apply conditional validators whenever participation type changes */
  onParticipationTypeChange(): void {
    const teamFields = ['teamName', 'teamContactPerson', 'numberOfTeamMembers'];
    teamFields.forEach((field) => {
      const ctrl = this.form.get(field);
      if (!ctrl) return;
      if (this.isTeam) {
        if (field !== 'numberOfTeamMembers') {
          ctrl.setValidators([Validators.required]);
        } else {
          ctrl.setValidators([Validators.required, Validators.pattern(/^[0-9]+$/)]);
        }
      } else {
        ctrl.clearValidators();
        ctrl.setValue('');
      }
      ctrl.updateValueAndValidity();
    });
  }

  // ─── Submit ───────────────────────────────────────────────────────────────
  onClickSubmit(): void {
    this.submitted = true;
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.submittedData = this.form.value as SportsTournamentRegistration;
      console.log('Sports Tournament Form Submitted!', this.form.value);
      this.snackBar.open(
        '🏆 Registration successful! See you on the field.',
        'Dismiss',
        { duration: 5000, panelClass: ['snack-success'] }
      );
    } else {
      this.submittedData = null;
      console.log('Form is not valid!');
      this.snackBar.open(
        '✕ Please complete all required fields before submitting.',
        'Dismiss',
        { duration: 4000, panelClass: ['snack-error'] }
      );
    }
  }
}
