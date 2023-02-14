import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroClientiComponent } from './filtro-clienti.component';

describe('FiltroClientiComponent', () => {
  let component: FiltroClientiComponent
                  ;
  let fixture: ComponentFixture<FiltroClientiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroClientiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroClientiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
