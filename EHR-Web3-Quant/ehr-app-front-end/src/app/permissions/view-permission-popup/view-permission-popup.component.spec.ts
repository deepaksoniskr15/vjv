import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPermissionPopupComponent } from './view-permission-popup.component';


describe('ViewPatientPopupComponent', () => {
  let component: ViewPermissionPopupComponent;
  let fixture: ComponentFixture<ViewPermissionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPermissionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPermissionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
