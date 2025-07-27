import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactForm {
  contactForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';
    if (this.contactForm.invalid) {
      return;
    }
    // Dummy API endpoint
    this.http.post('http://localhost:8080/api/post', this.contactForm.value).subscribe({
      next: () => {
        this.successMessage = 'Form submitted successfully!';
        this.contactForm.reset();
        this.submitted = false;
      },
      error: (error) => {
        if (error.error && error.error.message) {
        this.errorMessage = `${error.error.message}`;
      } else {
        this.errorMessage = 'There was an error submitting the form.';
      }
      }
    });
  }
}
