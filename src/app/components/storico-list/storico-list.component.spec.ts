import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoListComponent } from './storico-list.component';

describe('StoricoListComponent', () => {
  let component: StoricoListComponent;
  let fixture: ComponentFixture<StoricoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoricoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoricoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
