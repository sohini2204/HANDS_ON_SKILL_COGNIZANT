import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CourseCard } from './course-card';

describe('CourseCardComponent', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;
  const mockCourse: any = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course name in the template via @Input', () => {
    const h3El = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3El.textContent).toContain('Data Structures');
  });

  it('should emit enrollRequested with course id when Enroll is clicked', () => {
    vi.spyOn(component.enrollRequested, 'emit');
    component.onEnroll();
    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  it('should log ngOnChanges on course input change', () => {
    vi.spyOn(console, 'log');
    component.course = { ...mockCourse, name: 'Algorithms' };
    component.ngOnChanges({
      course: {
        previousValue: mockCourse,
        currentValue: { ...mockCourse, name: 'Algorithms' },
        firstChange: false,
        isFirstChange: () => false,
      },
    } as any);
    expect(console.log).toHaveBeenCalledWith(
      'CourseCard: previous value:',
      expect.objectContaining({ name: 'Data Structures' }),
      'current value:',
      expect.objectContaining({ name: 'Algorithms' })
    );
  });

  it('should toggle isExpanded when toggleExpand is called', () => {
    expect(component.isExpanded).toBe(false);
    component.toggleExpand();
    expect(component.isExpanded).toBe(true);
    component.toggleExpand();
    expect(component.isExpanded).toBe(false);
  });

  it('should return correct cardClasses based on course state', () => {
    component.course = { ...mockCourse, isEnrolled: true, credits: 5 };
    fixture.detectChanges();
    const classes = component.cardClasses;
    expect(classes['card--enrolled']).toBe(true);
    expect(classes['card--full']).toBe(true);
  });
});

