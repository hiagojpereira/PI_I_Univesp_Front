import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StuffingUpdateComponent } from './stuffing-update.component';

describe('StuffingUpdateComponent', () => {
  let component: StuffingUpdateComponent;
  let fixture: ComponentFixture<StuffingUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StuffingUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StuffingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
