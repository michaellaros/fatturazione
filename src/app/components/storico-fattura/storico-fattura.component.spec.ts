import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoFatturaComponent } from './storico-fattura.component';

describe('StoricoFatturaComponent', () => {
  let component: StoricoFatturaComponent;
  let fixture: ComponentFixture<StoricoFatturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoricoFatturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoricoFatturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
