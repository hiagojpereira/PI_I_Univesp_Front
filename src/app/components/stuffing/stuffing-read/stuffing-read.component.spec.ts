import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuffingReadComponent } from './stuffing-read.component';

describe('StuffingReadComponent', () => {
  let component: StuffingReadComponent;
  let fixture: ComponentFixture<StuffingReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StuffingReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuffingReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
