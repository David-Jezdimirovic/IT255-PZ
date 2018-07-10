import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllroomtypesComponent } from './allroomtypes.component';

describe('AllroomtypesComponent', () => {
  let component: AllroomtypesComponent;
  let fixture: ComponentFixture<AllroomtypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllroomtypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllroomtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
