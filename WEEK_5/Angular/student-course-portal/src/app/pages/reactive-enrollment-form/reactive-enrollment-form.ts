import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, of, delay } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reactive-enrollment-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentForm implements OnInit {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: [
        '',
        [Validators.required, Validators.email],
        [this.simulateEmailCheck],
      ],
      courseId: ['', [Validators.required, this.noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([]),
    });
    /*
     * Difference between enrollForm.value and enrollForm.getRawValue():
     * - enrollForm.value: Returns an object with values only for enabled controls.
     *   Disabled controls are excluded from the result. This is useful when you
     *   want to submit only active/editable form data to the server.
     * - enrollForm.getRawValue(): Returns values for ALL controls, including disabled ones.
     *   This is useful when you need the complete form data regardless of control state,
     *   such as when re-populating a form or logging full state for debugging.
     */
  }

  // Custom synchronous validator: disallow course codes starting with 'XX'
  noCourseCode(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.toString().startsWith('XX')) {
      return { noCourseCode: true };
    }
    return null;
  }

  // Custom async validator: simulate email availability check
  // Async validators fire after all sync validators pass to avoid unnecessary API calls.
  // They return Observable<ValidationErrors | null> or Promise<ValidationErrors | null>.
  simulateEmailCheck(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      delay(800),
      map((email) => {
        if (email && email.includes('test@')) {
          return { emailTaken: true };
        }
        return null;
      })
    );
  }

  /*
   * Typed getter for additionalCourses FormArray.
   * Using a getter in the component class rather than casting in the template ensures type safety,
   * cleaner templates, and better maintainability. The template uses `additionalCourses.controls`
   * without needing $any() type casting.
   */
  get additionalCourses(): FormArray {
    return this.enrollForm?.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(new FormControl('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    if (this.enrollForm.valid) {
      // enrollForm.value excludes disabled controls; getRawValue() includes all controls
      console.log('Form value (excludes disabled):', this.enrollForm.value);
      console.log('Form getRawValue (includes all):', this.enrollForm.getRawValue());
      this.submitted = true;
    }
  }
}

