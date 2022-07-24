import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RrssComponent } from './rrss.component';

describe('RrssComponent', () => {
  let component: RrssComponent;
  let fixture: ComponentFixture<RrssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RrssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RrssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
