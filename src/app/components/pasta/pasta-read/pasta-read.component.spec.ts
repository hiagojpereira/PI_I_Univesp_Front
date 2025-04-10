import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastaReadComponent } from './pasta-read.component';

describe('PastaReadComponent', () => {
  let component: PastaReadComponent;
  let fixture: ComponentFixture<PastaReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastaReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastaReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
