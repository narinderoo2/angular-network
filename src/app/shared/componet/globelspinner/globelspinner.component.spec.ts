import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobelspinnerComponent } from './globelspinner.component';

describe('GlobelspinnerComponent', () => {
  let component: GlobelspinnerComponent;
  let fixture: ComponentFixture<GlobelspinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobelspinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobelspinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
