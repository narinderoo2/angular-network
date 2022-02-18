import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlanktemplateComponent } from './blanktemplate.component';

describe('BlanktemplateComponent', () => {
  let component: BlanktemplateComponent;
  let fixture: ComponentFixture<BlanktemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlanktemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlanktemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
