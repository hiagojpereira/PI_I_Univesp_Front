import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDeleteComponent } from './position-delete.component';

describe('PositionDeleteComponent', () => {
  let component: PositionDeleteComponent;
  let fixture: ComponentFixture<PositionDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
