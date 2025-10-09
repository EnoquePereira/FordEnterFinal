import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaCardComponent } from './entrega-card.component';

describe('EntregaCardComponent', () => {
  let component: EntregaCardComponent;
  let fixture: ComponentFixture<EntregaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntregaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntregaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
