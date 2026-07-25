import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-course-summary-widget',
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css',
})
export class CourseSummaryWidget implements OnInit {
  courses: Course[] = [];
  enrolledIds: number[] = [];

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
    this.enrolledIds = this.enrollmentService.getEnrolledCourseIds();
  }
}

