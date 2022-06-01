import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaDialogOverviewComponent } from './tarea-dialog-overview.component';

describe('TareaDialogOverviewComponent', () => {
  let component: TareaDialogOverviewComponent;
  let fixture: ComponentFixture<TareaDialogOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareaDialogOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaDialogOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
