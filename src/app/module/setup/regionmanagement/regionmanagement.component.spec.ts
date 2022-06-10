import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionmanagementComponent } from './regionmanagement.component';

describe('RegionmanagementComponent', () => {
  let component: RegionmanagementComponent;
  let fixture: ComponentFixture<RegionmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
