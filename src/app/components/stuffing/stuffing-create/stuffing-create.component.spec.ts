import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuffingCreateComponent } from './stuffing-create.component';

describe('StuffingCreateComponent', () => {
  let component: StuffingCreateComponent;
  let fixture: ComponentFixture<StuffingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StuffingCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuffingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
