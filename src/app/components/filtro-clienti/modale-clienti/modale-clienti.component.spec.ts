import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleClientiComponent } from './modale-clienti.component';

describe('ModaleClientiComponent', () => {
  let component: ModaleClientiComponent;
  let fixture: ComponentFixture<ModaleClientiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaleClientiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleClientiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
