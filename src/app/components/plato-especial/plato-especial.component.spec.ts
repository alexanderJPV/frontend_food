import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoEspecialComponent } from './plato-especial.component';

describe('PlatoEspecialComponent', () => {
  let component: PlatoEspecialComponent;
  let fixture: ComponentFixture<PlatoEspecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatoEspecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatoEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
