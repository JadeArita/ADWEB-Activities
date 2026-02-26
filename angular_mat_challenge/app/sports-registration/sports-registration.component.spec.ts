import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SportsRegistrationComponent } from './sports-registration.component';

describe('SportsRegistrationComponent', () => {
  let component: SportsRegistrationComponent;
  let fixture: ComponentFixture<SportsRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportsRegistrationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SportsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
