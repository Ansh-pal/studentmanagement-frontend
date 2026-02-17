import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';

export const routes: Routes = [
  { path: '', component: StudentListComponent },
  { path: 'add', component: StudentFormComponent },
  { path: 'edit/:id', component: StudentEditComponent },
  { path: '**', redirectTo: '' }
];
