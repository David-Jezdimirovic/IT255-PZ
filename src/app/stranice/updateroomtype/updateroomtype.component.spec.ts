import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateroomtypeComponent } from './updateroomtype.component';

describe('UpdateroomtypeComponent', () => {
  let component: UpdateroomtypeComponent;
  let fixture: ComponentFixture<UpdateroomtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateroomtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateroomtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
