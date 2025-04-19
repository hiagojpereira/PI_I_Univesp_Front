import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionCrudComponent } from './position-crud.component';

describe('PositionCrudComponent', () => {
  let component: PositionCrudComponent;
  let fixture: ComponentFixture<PositionCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
