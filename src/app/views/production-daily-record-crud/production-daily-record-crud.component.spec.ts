import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductionDailyRecordCrudComponent } from './production-daily-record-crud.component';

describe('ProductionDailyRecordCrudComponent', () => {
  let component: ProductionDailyRecordCrudComponent;
  let fixture: ComponentFixture<ProductionDailyRecordCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionDailyRecordCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionDailyRecordCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
