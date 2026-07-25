const fs = require('fs');

// 1. Fix CourseService - Simple in-memory service without HTTP dependency
const courseService = `import { Injectable } from '@angular/core';
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
`;

// 2. Fix EnrollmentService
const enrollmentService = `import { Injectable } from '@angular/core';
import { CourseService } from './course';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];

  constructor(private courseService: CourseService) {}

  enroll(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Course[] {
    return this.enrolledCourseIds
      .map(id => this.courseService.getCourseById(id))
      .filter((c): c is Course => c !== undefined);
  }
}
`;

// 3. Fix NotificationService
const notificationService = `import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/*
 * NotificationService is provided at the component level in NotificationComponent.
 * Component-level providers (providers: [NotificationService] in @Component decorator)
 * create a new, separate instance scoped to that component and its children.
 * This is useful when you need isolated state per component instance,
 * such as a form wizard with multiple steps or a notification list that should
 * not share state with other instances.
 */
@Injectable()
export class NotificationService {
  private messages: string[] = [];
  private messagesSubject = new BehaviorSubject<string[]>([]);
  messages$: Observable<string[]> = this.messagesSubject.asObservable();

  addMessage(msg: string): void {
    this.messages.push(msg);
    this.messagesSubject.next([...this.messages]);
  }

  clearMessages(): void {
    this.messages = [];
    this.messagesSubject.next([]);
  }
}
`;

// 4. Fix CourseListComponent to use CourseService synchronously
const courseListTs = `import { Component, OnInit } from '@angular/core';
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
`;

// 5. Fix HomeComponent
const homeTs = `import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';
  coursesCount = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    // Fetch the live courses count from the service
    this.coursesCount = this.courseService.getCourses().length;
    console.log('HomeComponent initialised — courses loaded');
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}
`;

// 6. Fix CourseCardComponent
const courseCardTs = `import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EnrollmentService } from '../../services/enrollment';
import { HighlightDirective } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule, RouterModule, HighlightDirective, CreditLabelPipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  @Input() course!: { id: number; name: string; code: string; credits: number; gradeStatus: string };
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;
  isEnrolled = false;

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log(
        'Previous value:',
        changes['course'].previousValue,
        'Current value:',
        changes['course'].currentValue
      );
    }
    if (this.course) {
      this.isEnrolled = this.enrollmentService.isEnrolled(this.course.id);
    }
  }

  /*
   * Getter for ngClass - keeps templates clean by moving class logic to the component class.
   * Instead of complex object bindings in the template like:
   * [ngClass]="{ 'card--enrolled': isEnrolled, 'card--full': course.credits >= 4, 'expanded': isExpanded }"
   * We use a single getter: [ngClass]="cardClasses"
   */
  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course?.credits >= 4,
      expanded: this.isExpanded,
    };
  }

  /*
   * Getter for ngStyle - sets left border color based on gradeStatus
   */
  get cardStyle() {
    const colors: Record<string, string> = {
      passed: 'green',
      failed: 'red',
      pending: 'grey',
    };
    return { 'border-left': '5px solid ' + (colors[this.course?.gradeStatus] || 'grey') };
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  toggleEnroll(): void {
    if (this.isEnrolled) {
      this.enrollmentService.unenroll(this.course.id);
      this.isEnrolled = false;
    } else {
      this.enrollmentService.enroll(this.course.id);
      this.isEnrolled = true;
      this.enrollRequested.emit(this.course.id);
    }
  }
}
`;

// 7. Fix CourseCard HTML
const courseCardHtml = `<div class="course-card" [ngClass]="cardClasses" [ngStyle]="cardStyle" appHighlight>
  <h3>{{ course.name }}</h3>
  <p class="course-code">{{ course.code }}</p>
  <p class="course-credits">{{ course.credits | creditLabel }}</p>

  <div class="grade-badge" [ngSwitch]="course.gradeStatus">
    <span *ngSwitchCase="'passed'" class="badge badge-passed">Passed</span>
    <span *ngSwitchCase="'failed'" class="badge badge-failed">Failed</span>
    <span *ngSwitchCase="'pending'" class="badge badge-pending">Pending</span>
  </div>

  <button class="btn-details" (click)="toggleDetails()">Show Details</button>

  <button class="btn-enroll" (click)="toggleEnroll()">
    {{ isEnrolled ? 'Unenroll' : 'Enroll' }}
  </button>
</div>
`;

// 8. Fix NotificationComponent
const notificationTs = `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification';

/*
 * Component-level provider creates a NEW, SEPARATE instance of NotificationService
 * scoped to this component and its children. Unlike providedIn: 'root' which creates
 * a singleton shared app-wide, providing at component level means each
 * NotificationComponent instance gets its own NotificationService instance.
 * This is useful for isolated state management per component instance.
 */
@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
  providers: [NotificationService],
})
export class Notification {
  constructor(public notificationService: NotificationService) {}

  addTestMessage(): void {
    this.notificationService.addMessage('Test notification at ' + new Date().toLocaleTimeString());
  }
}
`;

// 9. Fix NotificationComponent HTML
const notificationHtml = `<div class="notification-container">
  <h3>Notifications</h3>
  <button (click)="addTestMessage()">Add Test Notification</button>

  <div class="messages" *ngIf="(notificationService.messages$ | async)?.length">
    <div class="message" *ngFor="let msg of notificationService.messages$ | async">
      {{ msg }}
    </div>
    <button class="clear-btn" (click)="notificationService.clearMessages()">Clear All</button>
  </div>

  <p *ngIf="!(notificationService.messages$ | async)?.length">No notifications yet.</p>
</div>
`;

// 10. Fix StudentProfileComponent
const studentProfileTs = `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment';

@Component({
  selector: 'app-student-profile',
  imports: [CommonModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile {
  constructor(public enrollmentService: EnrollmentService) {}
}
`;

// 11. Fix StudentProfile HTML
const studentProfileHtml = `<div class="profile-container">
  <h2>Student Profile</h2>

  <div class="profile-info">
    <h3>Enrolled Courses</h3>
    <div *ngIf="enrollmentService.getEnrolledCourses().length === 0">
      <p>You are not enrolled in any courses yet.</p>
    </div>
    <div *ngFor="let course of enrollmentService.getEnrolledCourses()" class="enrolled-course">
      <h4>{{ course.name }}</h4>
      <p>Code: {{ course.code }} | Credits: {{ course.credits }}</p>
      <span class="grade-badge" [ngSwitch]="course.gradeStatus">
        <span *ngSwitchCase="'passed'" class="badge badge-passed">Passed</span>
        <span *ngSwitchCase="'failed'" class="badge badge-failed">Failed</span>
        <span *ngSwitchCase="'pending'" class="badge badge-pending">Pending</span>
    </div>
</div>
`;

// Write all files
const basePath = 'src/app/';

fs.writeFileSync(basePath + 'services/course.ts', courseService);
fs.writeFileSync(basePath + 'services/enrollment.ts', enrollmentService);
fs.writeFileSync(basePath + 'services/notification.ts', notificationService);
fs.writeFileSync(basePath + 'pages/course-list/course-list.ts', courseListTs);
fs.writeFileSync(basePath + 'pages/home/home.ts', homeTs);
fs.writeFileSync(basePath + 'components/course-card/course-card.ts', courseCardTs);
fs.writeFileSync(basePath + 'components/course-card/course-card.html', courseCardHtml);
fs.writeFileSync(basePath + 'components/notification/notification.ts', notificationTs);
fs.writeFileSync(basePath + 'components/notification/notification.html', notificationHtml);
fs.writeFileSync(basePath + 'pages/student-profile/student-profile.ts', studentProfileTs);
fs.writeFileSync(basePath + 'pages/student-profile/student-profile.html', studentProfileHtml);

console.log('All Hands-On 6 files updated successfully');
