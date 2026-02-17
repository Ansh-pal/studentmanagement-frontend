import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  student: Student = {
    name: '',
    rollNo: '',
    course: '',
    marks: 0
  };

  studentId: number = 0;
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;
  loadingStudent: boolean = false;
  submitted: boolean = false;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = +params['id'];
      if (this.studentId) {
        this.loadStudent();
      }
    });
  }

  loadStudent(): void {
    this.loadingStudent = true;
    this.errorMessage = '';

    this.studentService.getStudentById(this.studentId).subscribe({
      next: (data) => {
        this.student = data;
        this.loadingStudent = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load student data. Please try again.';
        this.loadingStudent = false;
        console.error('Error loading student:', error);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Validate form
    if (!this.isFormValid()) {
      return;
    }

    this.loading = true;

    this.studentService.updateStudent(this.studentId, this.student).subscribe({
      next: (response) => {
        this.successMessage = 'Student updated successfully!';
        this.loading = false;
        
        // Redirect to student list after 1.5 seconds
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = 'Failed to update student. Please try again.';
        this.loading = false;
        console.error('Error updating student:', error);
      }
    });
  }

  isFormValid(): boolean {
    return !!(this.student.name && this.student.rollNo);
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
