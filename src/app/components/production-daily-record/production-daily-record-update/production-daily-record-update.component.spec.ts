import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDailyRecordUpdateComponent } from './production-daily-record-update.component';

describe('ProductionDailyRecordUpdateComponent', () => {
  let component: ProductionDailyRecordUpdateComponent;
  let fixture: ComponentFixture<ProductionDailyRecordUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionDailyRecordUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionDailyRecordUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
