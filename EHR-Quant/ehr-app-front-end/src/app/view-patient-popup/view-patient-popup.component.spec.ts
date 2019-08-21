import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatientPopupComponent } from './view-patient-popup.component';

describe('ViewPatientPopupComponent', () => {
  let component: ViewPatientPopupComponent;
  let fixture: ComponentFixture<ViewPatientPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPatientPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPatientPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
