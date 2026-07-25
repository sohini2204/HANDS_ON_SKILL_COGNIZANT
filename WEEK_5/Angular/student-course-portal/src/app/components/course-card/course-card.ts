import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
