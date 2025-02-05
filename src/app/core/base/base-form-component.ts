import {Directive, inject, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

export abstract class BaseFormComponent<T> {
  protected fb = inject(FormBuilder);
  protected router = inject(Router);
  abstract redirectUrl: string;
  abstract createRequest(data: T): Observable<any>;

  form!: FormGroup;
  isSubmitting = signal(false);

  protected onInit(formDefinition: { [key: string]: any }) {
    this.form = this.fb.group(formDefinition);
  }

  get f() {
    return this.form.controls as { [key: string]: FormControl };
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.isSubmitting.set(true);
    const formData: T = this.form.value;

    this.createRequest(formData).subscribe({
      next: () => {
        this.form.reset();
        this.router.navigate([this.redirectUrl]);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => this.isSubmitting.set(false),
    });
  }
}
