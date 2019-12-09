import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolCreateComponent } from './tool-create.component';

describe('ToolCreateComponent', () => {
  let component: ToolCreateComponent;
  let fixture: ComponentFixture<ToolCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
