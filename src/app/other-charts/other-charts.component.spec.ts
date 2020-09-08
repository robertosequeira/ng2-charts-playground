import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherChartsComponent } from './other-charts.component';

describe('OtherChartsComponent', () => {
  let component: OtherChartsComponent;
  let fixture: ComponentFixture<OtherChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
