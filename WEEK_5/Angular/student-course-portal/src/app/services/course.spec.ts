import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/courses';
  const mockCourses = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Algorithms', code: 'CS201', credits: 3, gradeStatus: 'pending' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService],
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch courses via GET', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses as any);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should handle error on getCourses', () => {
    service.getCourses().subscribe({
      error: (error) => {
        expect(error.message).toContain('Failed to load courses');
      },
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should create a course via POST', () => {
    const newCourse = { name: 'New Course', code: 'CS301', credits: 3, gradeStatus: 'pending' as const };
    const createdCourse = { id: 3, ...newCourse };

    service.createCourse(newCourse).subscribe((course) => {
      expect(course).toEqual(createdCourse as any);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCourse);
    req.flush(createdCourse);
  });

  it('should update a course via PUT', () => {
    const updatedCourse = { id: 1, name: 'Updated', code: 'CS101', credits: 4, gradeStatus: 'passed' as const };

    service.updateCourse(updatedCourse).subscribe((course) => {
      expect(course.name).toBe('Updated');
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedCourse);
  });

  it('should delete a course via DELETE', () => {
    service.deleteCourse(1).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});

