import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcycleFormComponent } from './testcycle-form.component';

describe('TestcycleFormComponent', () => {
  let component: TestcycleFormComponent;
  let fixture: ComponentFixture<TestcycleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestcycleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestcycleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
