import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlants } from './admin-plants';

describe('AdminPlants', () => {
  let component: AdminPlants;
  let fixture: ComponentFixture<AdminPlants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPlants],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPlants);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
