import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleRicevutaComponent } from './modale-ricevuta.component';

describe('ModaleRicevutaComponent', () => {
  let component: ModaleRicevutaComponent;
  let fixture: ComponentFixture<ModaleRicevutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaleRicevutaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleRicevutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
