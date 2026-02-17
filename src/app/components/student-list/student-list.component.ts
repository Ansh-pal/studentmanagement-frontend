import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    this.errorMessage = '';
    
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load students. Please try again later.';
        this.loading = false;
        console.error('Error loading students:', error);
      }
    });
  }

  editStudent(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/edit', id]);
    }
  }

  deleteStudent(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.loadStudents();
          alert('Student deleted successfully!');
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete student. Please try again.';
          console.error('Error deleting student:', error);
        }
      });
    }
  }

  addNewStudent(): void {
    this.router.navigate(['/add']);
  }
}
