import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeReadComponent } from './employee-read.component';

describe('EmployeeReadComponent', () => {
  let component: EmployeeReadComponent;
  let fixture: ComponentFixture<EmployeeReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
