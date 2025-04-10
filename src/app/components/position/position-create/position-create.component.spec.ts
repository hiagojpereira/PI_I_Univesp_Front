import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionCreateComponent } from './position-create.component';

describe('PositionCreateComponent', () => {
  let component: PositionCreateComponent;
  let fixture: ComponentFixture<PositionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
