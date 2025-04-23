import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDailyRecordDetailComponent } from './production-daily-record-detail.component';

describe('ProductionDailyRecordDetailComponent', () => {
  let component: ProductionDailyRecordDetailComponent;
  let fixture: ComponentFixture<ProductionDailyRecordDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionDailyRecordDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionDailyRecordDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
