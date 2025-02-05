import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityCreateComponent } from './university-create.component';

describe('UniversityCreateComponent', () => {
  let component: UniversityCreateComponent;
  let fixture: ComponentFixture<UniversityCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversityCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
