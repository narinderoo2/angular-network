import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkteplogyComponent } from './networkteplogy.component';

describe('NetworkteplogyComponent', () => {
  let component: NetworkteplogyComponent;
  let fixture: ComponentFixture<NetworkteplogyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkteplogyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkteplogyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
