import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {
  student: Student = {
    name: '',
    rollNo: '',
    course: '',
    marks: 0
  };

  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;
  submitted: boolean = false;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Validate form
    if (!this.isFormValid()) {
      return;
    }

    this.loading = true;

    this.studentService.addStudent(this.student).subscribe({
      next: (response) => {
        this.successMessage = 'Student added successfully!';
        this.loading = false;
        
        // Redirect to student list after 1.5 seconds
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = 'Failed to add student. Please try again.';
        this.loading = false;
        console.error('Error adding student:', error);
      }
    });
  }

  isFormValid(): boolean {
    return !!(this.student.name && this.student.rollNo);
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  resetForm(): void {
    this.student = {
      name: '',
      rollNo: '',
      course: '',
      marks: 0
    };
    this.submitted = false;
    this.errorMessage = '';
    this.successMessage = '';
  }
}
