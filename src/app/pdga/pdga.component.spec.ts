import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdgaComponent } from './pdga.component';

describe('PdgaComponent', () => {
  let component: PdgaComponent;
  let fixture: ComponentFixture<PdgaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdgaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
