import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastaCrudComponent } from './pasta-crud.component';

describe('PastaCrudComponent', () => {
  let component: PastaCrudComponent;
  let fixture: ComponentFixture<PastaCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastaCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
