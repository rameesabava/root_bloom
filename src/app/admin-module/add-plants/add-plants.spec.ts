import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlants } from './add-plants';

describe('AddPlants', () => {
  let component: AddPlants;
  let fixture: ComponentFixture<AddPlants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPlants],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPlants);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
