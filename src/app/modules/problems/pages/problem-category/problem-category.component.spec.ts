import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemCategoryComponent } from './problem-category.component';

describe('ProblemCategoryComponent', () => {
  let component: ProblemCategoryComponent;
  let fixture: ComponentFixture<ProblemCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
