import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFoodComponent } from './favorite-food.component';

describe('FavoriteFoodComponent', () => {
  let component: FavoriteFoodComponent;
  let fixture: ComponentFixture<FavoriteFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
