import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoDialogComponent } from './gasto-dialog.component';

describe('GastoDialogComponent', () => {
  let component: GastoDialogComponent;
  let fixture: ComponentFixture<GastoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GastoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
