import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CourseList } from './pages/course-list/course-list';
import { StudentProfile } from './pages/student-profile/student-profile';
import { EnrollmentForm } from './pages/enrollment-form/enrollment-form';
import { ReactiveEnrollmentForm } from './pages/reactive-enrollment-form/reactive-enrollment-form';
import { CoursesLayout } from './components/courses-layout/courses-layout';
import { CourseDetail } from './pages/course-detail/course-detail';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'courses',
    component: CoursesLayout,
    children: [
      { path: '', component: CourseList },
      { path: ':id', component: CourseDetail },
    ],
  },
  {
    path: 'profile',
    component: StudentProfile,
    canActivate: [authGuard],
  },
  {
    path: 'enroll',
    component: EnrollmentForm,
    canActivate: [authGuard],
  },
  {
    path: 'enroll-reactive',
    component: ReactiveEnrollmentForm,
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard],
  },
  { path: '**', component: NotFound },
];

