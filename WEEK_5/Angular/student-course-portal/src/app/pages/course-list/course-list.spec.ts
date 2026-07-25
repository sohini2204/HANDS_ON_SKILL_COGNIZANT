import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CourseList } from './course-list';
import { CourseService } from '../../services/course';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  const mockCourses = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' as const },
    { id: 2, name: 'Algorithms', code: 'CS201', credits: 3, gradeStatus: 'pending' as const },
  ];
  let courseServiceStub: Partial<CourseService>;

  beforeEach(async () => {
    courseServiceStub = {
      getCourses: vi.fn().mockReturnValue(of(mockCourses)),
      getCourseById: vi.fn(),
      createCourse: vi.fn(),
      updateCourse: vi.fn(),
      deleteCourse: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        { provide: CourseService, useValue: courseServiceStub },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading initially', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const loadingEl = fixture.debugElement.query(By.css('.loading-text'));
    expect(loadingEl).toBeTruthy();
    expect(loadingEl.nativeElement.textContent).toContain('Loading courses...');
  });

  it('should show courses after loading completes', () => {
    component.courses = mockCourses;
    component.isLoading = false;
    fixture.detectChanges();
    const courseCards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(courseCards.length).toBe(2);
  });
});

