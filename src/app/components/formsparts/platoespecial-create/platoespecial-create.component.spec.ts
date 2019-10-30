import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoespecialCreateComponent } from './platoespecial-create.component';

describe('PlatoespecialCreateComponent', () => {
  let component: PlatoespecialCreateComponent;
  let fixture: ComponentFixture<PlatoespecialCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatoespecialCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatoespecialCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
