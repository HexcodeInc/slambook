import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcustomqusComponent } from './addcustomqus.component';

describe('AddcustomqusComponent', () => {
  let component: AddcustomqusComponent;
  let fixture: ComponentFixture<AddcustomqusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcustomqusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcustomqusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
