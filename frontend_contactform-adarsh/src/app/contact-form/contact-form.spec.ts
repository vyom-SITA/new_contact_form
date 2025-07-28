import { TestBed, ComponentFixture, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { ContactForm } from './contact-form';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

// Helper function for setting form values
function setFormValues(component: ContactForm, values: any) {
  component.contactForm.setValue(values);
}

describe('ContactForm', () => {
  let component: ContactForm;
  let fixture: ComponentFixture<ContactForm>;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ContactForm, HttpClientTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactForm);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.contactForm.value).toEqual({
      title: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: ''
    });
  });

  it('should mark all fields as required', () => {
    setFormValues(component, { title: '', firstName: '', lastName: '', phoneNumber: '', email: '' });
    expect(component.contactForm.invalid).toBeTrue();
    expect(component.f['title'].errors?.['required']).toBeTrue();
    expect(component.f['firstName'].errors?.['required']).toBeTrue();
    expect(component.f['lastName'].errors?.['required']).toBeTrue();
    expect(component.f['phone'].errors?.['required']).toBeTrue();
    expect(component.f['email'].errors?.['required']).toBeTrue();
  });

  it('should validate firstName and lastName as only letters', () => {
    setFormValues(component, {
      title: 'Mr',
      firstName: 'John1',
      lastName: 'Doe2',
      phoneNumber: '+1234567890',
      email: 'john@example.com'
    });
    expect(component.f['firstName'].errors?.['pattern']).toBeTruthy();
    expect(component.f['lastName'].errors?.['pattern']).toBeTruthy();
  });

  it('should validate phone as 10-15 digits, may start with +', () => {
    setFormValues(component, {
      title: 'Mr',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123',
      email: 'john@example.com'
    });
    expect(component.f['phone'].errors?.['pattern']).toBeTruthy();
    setFormValues(component, {
      title: 'Mr',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '+1234567890',
      email: 'john@example.com'
    });
    expect(component.f['phone'].valid).toBeTrue();
  });

  it('should validate email format', () => {
    setFormValues(component, {
      title: 'Mr',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '+1234567890',
      email: 'not-an-email'
    });
    expect(component.f['email'].errors?.['email']).toBeTrue();
    setFormValues(component, {
      title: 'Mr',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '+1234567890',
      email: 'john@example.com'
    });
    expect(component.f['email'].valid).toBeTrue();
  });

  it('should not submit if form is invalid', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    setFormValues(component, { title: '', firstName: '', lastName: '', phoneNumber: '', email: '' });
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.contactForm.invalid).toBeTrue();
    expect(component.successMessage).toBe('');
  });

  it('should submit form and show success message on valid input', fakeAsync(() => {
    setFormValues(component, {
      title: 'Mr',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '+1234567890',
      email: 'john@example.com'
    });
    component.contactForm.markAsDirty();
    component.contactForm.markAsTouched();
    fixture.detectChanges();
    expect(component.contactForm.valid).toBeTrue();
    component.onSubmit();
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toBe('POST');
    req.flush({});
    tick();
    expect(component.successMessage).toBe('Form submitted successfully!');
    expect(component.errorMessage).toBe('');
    expect(component.contactForm.value).toEqual({
      title: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null
    });
    expect(component.submitted).toBeFalse();
  }));

  it('should show error message on HTTP error', fakeAsync(() => {
    setFormValues(component, {
      title: 'Mr',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '+1234567890',
      email: 'john@example.com'
    });
    component.contactForm.markAsDirty();
    component.contactForm.markAsTouched();
    fixture.detectChanges();
    expect(component.contactForm.valid).toBeTrue();
    component.onSubmit();
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Network error'));
    tick();
    expect(component.successMessage).toBe('');
    expect(component.errorMessage).toBe('There was an error submitting the form.');
  }));
}); 