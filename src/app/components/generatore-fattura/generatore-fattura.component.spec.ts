import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratoreFatturaComponent } from './generatore-fattura.component';

describe('GeneratoreFatturaComponent', () => {
  let component: GeneratoreFatturaComponent;
  let fixture: ComponentFixture<GeneratoreFatturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratoreFatturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratoreFatturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
