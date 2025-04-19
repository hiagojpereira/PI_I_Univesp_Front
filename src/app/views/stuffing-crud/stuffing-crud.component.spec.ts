import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuffingCrudComponent } from './stuffing-crud.component';

describe('StuffingCrudComponent', () => {
  let component: StuffingCrudComponent;
  let fixture: ComponentFixture<StuffingCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StuffingCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuffingCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
