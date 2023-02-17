import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleErroreComponent } from './modale-errore.component';

describe('ModaleErroreComponent', () => {
  let component: ModaleErroreComponent;
  let fixture: ComponentFixture<ModaleErroreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaleErroreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleErroreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
