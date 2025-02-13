import {Component, inject, OnInit} from '@angular/core';
import {BaseFormComponent} from '@app/core/base/base-form-component';
import {UserService} from '@app/modules/users/services/user.service';
import {FacultyCreateModel} from '@app/modules/users/models/faculty-create.model';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {DropdownModel} from '@app/core/models/dropdown.model';
import {catchError, of} from 'rxjs';

@Component({
  selector: 'app-faculty-create',
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './faculty-create.component.html',
  standalone: true,
  styleUrl: './faculty-create.component.scss'
})
export class FacultyCreateComponent extends BaseFormComponent<FacultyCreateModel> implements OnInit {
  redirectUrl = '/users/faculties';
  loading = false;
  private userService = inject(UserService);
  universities: DropdownModel[] = [];

  createRequest(data: FacultyCreateModel) {
    return this.userService.createFaculty(data);
  }

  ngOnInit(): void {
    this.onInit({
      name: ['', [Validators.required, Validators.minLength(3)]],
      universityId: [null, [Validators.required]],
      status: [false, [Validators.required]],
    });
    this.loadUniversity();
  }

  loadUniversity() {
    this.loading = true;
    this.userService.getUniversityDropdown()
      .subscribe(({data}) => {
        this.universities = data;
        this.loading = false;
      });
  }
}
