import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CourseService } from '../../services/course';
import { EnrollmentService } from '../../services/enrollment';
import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, RouterModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses: Course[] = [];
  isLoading = true;
  selectedCourseId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Simulate loading delay
    setTimeout(() => {
      this.courses = this.courseService.getCourses();
      this.isLoading = false;
    }, 1500);
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
    this.enrollmentService.enroll(courseId);
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  navigateToCourse(courseId: number): void {
    this.router.navigate(['courses', courseId]);
  }
}
