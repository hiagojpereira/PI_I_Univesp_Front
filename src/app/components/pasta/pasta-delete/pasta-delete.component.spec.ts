import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastaDeleteComponent } from './pasta-delete.component';

describe('PastaDeleteComponent', () => {
  let component: PastaDeleteComponent;
  let fixture: ComponentFixture<PastaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastaDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
