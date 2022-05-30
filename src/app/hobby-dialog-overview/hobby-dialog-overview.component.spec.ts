import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyDialogOverviewComponent } from './hobby-dialog-overview.component';

describe('HobbyDialogOverviewComponent', () => {
  let component: HobbyDialogOverviewComponent;
  let fixture: ComponentFixture<HobbyDialogOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HobbyDialogOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HobbyDialogOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
