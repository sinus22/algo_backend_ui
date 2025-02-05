import {Component, OnInit, signal} from '@angular/core';
import {CreateProblem} from '@app/core/models/create-problem';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ProblemService} from '@app/modules/problems/services/problem.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-problem-create',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './problem-create.component.html',
  styleUrl: './problem-create.component.scss',
  standalone: true,
})
export class ProblemCreateComponent implements OnInit {
  problemForm!: FormGroup;
  isSubmitting = signal(false);

  constructor(private fb: FormBuilder, private problemService: ProblemService, private router: Router) {
  }

  ngOnInit(): void {
    this.problemForm = this.fb.group({
      num: [null, [Validators.required, Validators.min(1)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: [''],
      comment: [''],
      timeLimit: [null, [Validators.min(1)]],
      memoryLimit: [null, [Validators.min(1)]],
      status: [false, [Validators.required]],
      type: [null, [Validators.required]],
      ball: [null, [Validators.min(0)]],
    })

  }
  // get f() {
  //   return this.problemForm.controls;
  // }

  get f() {
    return this.problemForm.controls as { [key: string]: FormControl };
  }
  onSubmit(): void {
    if (this.problemForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    this.isSubmitting.set(true);
    const problemData: CreateProblem = this.problemForm.value;
    this.problemService.createProblem(problemData).subscribe({
      next: (response) => {
        this.problemForm.reset();
        this.router.navigate(['/dashboard/problems']);
      },
      error: (error) => {
        console.error('Error creating problem:', error);
      },
      complete: ()=> this.isSubmitting.set(false),
    });
  }

}
