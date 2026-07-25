import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

/*
 * CourseService - provides course data to multiple components.
 * providedIn: 'root' makes it a singleton - one instance shared across the entire application.
 * All injectors up the tree share the same instance.
 */
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Algorithms', code: 'CS201', credits: 3, gradeStatus: 'pending' },
    { id: 3, name: 'Web Development', code: 'CS301', credits: 3, gradeStatus: 'failed' },
    { id: 4, name: 'Database Systems', code: 'CS401', credits: 4, gradeStatus: 'pending' },
    { id: 5, name: 'Operating Systems', code: 'CS501', credits: 3, gradeStatus: 'passed' },
  ];

  getCourses(): Course[] {
    return [...this.courses];
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}
