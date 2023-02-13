import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroRicevutaComponent } from './filtro-ricevuta.component';

describe('FiltroRicevutaComponent', () => {
  let component: FiltroRicevutaComponent;
  let fixture: ComponentFixture<FiltroRicevutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroRicevutaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroRicevutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
