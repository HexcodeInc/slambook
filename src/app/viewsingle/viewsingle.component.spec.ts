import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsingleComponent } from './viewsingle.component';

describe('ViewsingleComponent', () => {
  let component: ViewsingleComponent;
  let fixture: ComponentFixture<ViewsingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
