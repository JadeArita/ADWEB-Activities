import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Pet {
  _id?: string;
  name: string;
  breed: string;
  age: number;
  gender: string;
  vaccinated: boolean;
  adoptionStatus: string;
  description?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'pet-adoption';
  readonly APIUrl = 'http://localhost:3000/pets';

  pets: Pet[] = [];
  isEditing = false;
  editingId: string | null = null;

  petForm: Pet = {
    name: '',
    breed: '',
    age: 0,
    gender: 'Male',
    vaccinated: false,
    adoptionStatus: 'Available',
    description: '',
    imageUrl: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPets();
  }

  getPets(): void {
    this.http.get<Pet[]>(this.APIUrl).subscribe({
      next: (data) => { this.pets = data; },
      error: (err) => console.error('Error fetching pets:', err)
    });
  }

  addPet(): void {
    if (!this.petForm.name || !this.petForm.breed || !this.petForm.age || !this.petForm.gender) {
      alert('Please fill in all required fields (Name, Breed, Age, Gender).');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.petForm.name);
    formData.append('breed', this.petForm.breed);
    formData.append('age', String(this.petForm.age));
    formData.append('gender', this.petForm.gender);
    formData.append('vaccinated', String(this.petForm.vaccinated));
    formData.append('adoptionStatus', this.petForm.adoptionStatus);
    formData.append('description', this.petForm.description || '');
    formData.append('imageUrl', this.petForm.imageUrl || '');

    this.http.post(this.APIUrl, formData).subscribe({
      next: () => {
        this.getPets();
        this.resetForm();
      },
      error: (err) => console.error('Error adding pet:', err)
    });
  }

  editPet(pet: Pet): void {
    this.isEditing = true;
    this.editingId = pet._id || null;
    this.petForm = { ...pet };
  }

  updatePet(): void {
    if (!this.editingId) return;

    const formData = new FormData();
    formData.append('name', this.petForm.name);
    formData.append('breed', this.petForm.breed);
    formData.append('age', String(this.petForm.age));
    formData.append('gender', this.petForm.gender);
    formData.append('vaccinated', String(this.petForm.vaccinated));
    formData.append('adoptionStatus', this.petForm.adoptionStatus);
    formData.append('description', this.petForm.description || '');
    formData.append('imageUrl', this.petForm.imageUrl || '');

    this.http.put(`${this.APIUrl}/${this.editingId}`, formData).subscribe({
      next: () => {
        this.getPets();
        this.resetForm();
      },
      error: (err) => console.error('Error updating pet:', err)
    });
  }

  deletePet(id: string | undefined): void {
    if (!id) return;
    if (!confirm('Are you sure you want to remove this pet?')) return;

    this.http.delete(`${this.APIUrl}/${id}`).subscribe({
      next: () => this.getPets(),
      error: (err) => console.error('Error deleting pet:', err)
    });
  }

  submitForm(): void {
    if (this.isEditing) {
      this.updatePet();
    } else {
      this.addPet();
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingId = null;
    this.petForm = {
      name: '',
      breed: '',
      age: 0,
      gender: 'Male',
      vaccinated: false,
      adoptionStatus: 'Available',
      description: '',
      imageUrl: ''
    };
  }

  // Helper methods for dashboard summary
  getAvailableCount(): number {
    return this.pets.filter(pet => pet.adoptionStatus === 'Available').length;
  }

  getAdoptedCount(): number {
    return this.pets.filter(pet => pet.adoptionStatus === 'Adopted').length;
  }
}
