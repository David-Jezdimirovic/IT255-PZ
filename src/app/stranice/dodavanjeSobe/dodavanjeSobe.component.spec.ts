import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodavanjeSobeComponent } from './dodavanjeSobe.component';

describe('DodavanjeSobeComponent', () => {
  let component: DodavanjeSobeComponent;
  let fixture: ComponentFixture<DodavanjeSobeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodavanjeSobeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodavanjeSobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
