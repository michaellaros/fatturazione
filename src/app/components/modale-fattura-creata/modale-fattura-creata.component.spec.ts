import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleFatturaCreataComponent } from './modale-fattura-creata.component';

describe('ModaleFatturaCreataComponent', () => {
  let component: ModaleFatturaCreataComponent;
  let fixture: ComponentFixture<ModaleFatturaCreataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaleFatturaCreataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleFatturaCreataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
