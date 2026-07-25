const fs = require('fs');

// Update HomeComponent to include enrolledCount and gpa
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
  coursesCount = 12;
  enrolledCount = 3;
  gpa = '3.8';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    // Fetch the live courses count from the service (Hands-On 6: DI)
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

// Update course-list.html - close the div and add proper ng-template
const courseListHtml = `<div class="course-list-container">
  <h2>Course List</h2>

  <!-- Search input with query params update -->
  <div class="search-bar">
    <input type="text" [(ngModel)]="searchTerm" placeholder="Search courses..." (input)="onSearch()" />
  </div>

  <!-- *ngIf for loading state with 1.5s timeout -->
  <p *ngIf="isLoading" class="loading-text">Loading courses...</p>

  <p *ngIf="errorMessage" class="error-text">{{ errorMessage }}</p>

  <!-- *ngIf with else template for empty courses -->
  <ng-template #noCourses>
    <p class="no-courses">No courses available.</p>
  </ng-template>

  <div *ngIf="!isLoading && !errorMessage && courses.length > 0; else noCourses">
    <!-- Course grid with *ngFor and trackBy -->
    <div class="course-grid">
      <app-course-card
        *ngFor="let course of courses; trackBy: trackByCourseId; let i = index"
        [course]="course"
        (enrollRequested)="onEnroll($event)"
        (click)="navigateToCourse(course.id)"
      ></app-course-card>
    </div>

    <!-- Display selected course ID on enrollment -->
    <p *ngIf="selectedCourseId" class="selected-info">Selected course ID: {{ selectedCourseId }}</p>
  </div>
`;

const basePath = 'src/app/';
fs.writeFileSync(basePath + 'pages/home/home.ts', homeTs);
fs.writeFileSync(basePath + 'pages/course-list/course-list.html', courseListHtml);
console.log('Part 2 fixes applied');
</create_file>
