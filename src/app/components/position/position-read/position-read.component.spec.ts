import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionReadComponent } from './position-read.component';

describe('PositionReadComponent', () => {
  let component: PositionReadComponent;
  let fixture: ComponentFixture<PositionReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
