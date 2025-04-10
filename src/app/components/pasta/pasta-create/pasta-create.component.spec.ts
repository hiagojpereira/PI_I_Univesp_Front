import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastaCreateComponent } from './pasta-create.component';

describe('PastaCreateComponent', () => {
  let component: PastaCreateComponent;
  let fixture: ComponentFixture<PastaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastaCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
