import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-directives',
  imports: [FormsModule],
  templateUrl: './directives.html',
  styleUrl: './directives.css',
})
export class Directives {
  // Control Properties for @if
  isStaticNoteVisible: boolean = false;
  isNoteVisible: boolean = true;
  isParagraphVisible: boolean = true;

  // Control Properties for @if (months)
  monthNameStatic: string = 'Mar';
  monthNameDynamic: string = 'Mar';

  // Array Property for @for (city list)
  cityList: string[] = ["Angeles", "San Fernando", "Mabalacat", "Tarlac", "Bataan"];

  // Array Property for @for (student list - new property)
  studentList: any[] = [
    {stud_name: 'J Arita', course: 'Web Development', isActive: false},
    {stud_name: 'V Dizon', course: 'Network Administration', isActive: true},
    {stud_name: 'J Escoto', course: 'Systems Development', isActive: false},
    {stud_name: 'J Manaloto', course: 'CyberSecurity', isActive: true},
    {stud_name: 'A Quiambao', course: 'Web Development', isActive: true},
  ];

  // Methods
  showNote() {
    this.isNoteVisible = true;
  }

  hideNote() {
    this.isNoteVisible = false;
  }

  toggleNote() {
    this.isParagraphVisible = !this.isParagraphVisible;
  }
}
