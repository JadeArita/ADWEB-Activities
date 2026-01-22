import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCmp } from './new-cmp';

describe('NewCmp', () => {
  let component: NewCmp;
  let fixture: ComponentFixture<NewCmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCmp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCmp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
