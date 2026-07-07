import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlants } from './update-plants';

describe('UpdatePlants', () => {
  let component: UpdatePlants;
  let fixture: ComponentFixture<UpdatePlants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePlants],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePlants);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
