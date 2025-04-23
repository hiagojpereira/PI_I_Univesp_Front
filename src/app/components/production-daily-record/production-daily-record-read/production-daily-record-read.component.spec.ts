import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDailyRecordReadComponent } from './production-daily-record-read.component';

describe('ProductionDailyRecordReadComponent', () => {
  let component: ProductionDailyRecordReadComponent;
  let fixture: ComponentFixture<ProductionDailyRecordReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionDailyRecordReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionDailyRecordReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
