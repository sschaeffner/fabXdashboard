import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationBubbleComponent } from './qualification-bubble.component';

describe('QualificationTagComponent', () => {
  let component: QualificationBubbleComponent;
  let fixture: ComponentFixture<QualificationBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualificationBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualificationBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
