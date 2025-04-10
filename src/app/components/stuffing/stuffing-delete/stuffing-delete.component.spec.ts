import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuffingDeleteComponent } from './stuffing-delete.component';

describe('StuffingDeleteComponent', () => {
  let component: StuffingDeleteComponent;
  let fixture: ComponentFixture<StuffingDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StuffingDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuffingDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
