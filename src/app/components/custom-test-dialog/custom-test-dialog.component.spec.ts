import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTestDialogComponent } from './custom-test-dialog.component';

describe('CustomTestDialogComponent', () => {
  let component: CustomTestDialogComponent;
  let fixture: ComponentFixture<CustomTestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
