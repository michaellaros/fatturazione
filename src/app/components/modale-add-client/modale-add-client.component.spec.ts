import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleAddClientComponent } from './modale-add-client.component';

describe('ModaleAddClientComponent', () => {
  let component: ModaleAddClientComponent;
  let fixture: ComponentFixture<ModaleAddClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaleAddClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleAddClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
