import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrackingModalComponent } from './time-tracking-modal.component';

describe('TimeTrackingModalComponent', () => {
  let component: TimeTrackingModalComponent;
  let fixture: ComponentFixture<TimeTrackingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeTrackingModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTrackingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
