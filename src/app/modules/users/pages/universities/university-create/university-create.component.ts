import {Component, inject, OnInit, signal} from '@angular/core';
import { ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '@app/modules/users/services/user.service';
import {UniversityCreate} from '@app/modules/users/models/university-create.model';
import {BaseFormComponent} from '@app/core/base/base-form-component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-university-create',
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './university-create.component.html',
  standalone: true,
  styleUrl: './university-create.component.scss'
})
export class UniversityCreateComponent extends BaseFormComponent<UniversityCreate> implements OnInit {
  redirectUrl = '/users/universities';
  private userService = inject(UserService);

  ngOnInit(): void {
    this.onInit({
      name: ['', [Validators.required, Validators.minLength(3)]],
      status: [false, [Validators.required]],
    });
  }
  createRequest(data: UniversityCreate) {
    return this.userService.createUniversity(data);
  }
}
