import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationslistComponent } from './reservationslist.component';

describe('ReservationslistComponent', () => {
  let component: ReservationslistComponent;
  let fixture: ComponentFixture<ReservationslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
