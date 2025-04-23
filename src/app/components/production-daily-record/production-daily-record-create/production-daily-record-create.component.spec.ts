import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDailyRecordCreateComponent } from './production-daily-record-create.component';

describe('ProductionDailyRecordCreateComponent', () => {
  let component: ProductionDailyRecordCreateComponent;
  let fixture: ComponentFixture<ProductionDailyRecordCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionDailyRecordCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionDailyRecordCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
