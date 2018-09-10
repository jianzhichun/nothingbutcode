import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignableBufferComponent } from './assignable-buffer.component';

describe('AssignableBufferComponent', () => {
  let component: AssignableBufferComponent;
  let fixture: ComponentFixture<AssignableBufferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignableBufferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignableBufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
