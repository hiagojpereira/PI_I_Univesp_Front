import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastaUpdateComponent } from './pasta-update.component';

describe('PastaUpdateComponent', () => {
  let component: PastaUpdateComponent;
  let fixture: ComponentFixture<PastaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastaUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
