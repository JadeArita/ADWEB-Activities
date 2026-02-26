import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDemo } from './template-demo.component';

describe('TemplateDemoComponent', () => {
  let component: TemplateDemo;
  let fixture: ComponentFixture<TemplateDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
