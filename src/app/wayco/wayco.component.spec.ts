import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaycoComponent } from './wayco.component';

describe('WaycoComponent', () => {
  let component: WaycoComponent;
  let fixture: ComponentFixture<WaycoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaycoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaycoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
