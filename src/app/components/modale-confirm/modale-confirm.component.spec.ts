import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleConfirmComponent } from './modale-confirm.component';

describe('ModaleConfirmComponent', () => {
  let component: ModaleConfirmComponent;
  let fixture: ComponentFixture<ModaleConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaleConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
