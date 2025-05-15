import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseFormComponent } from './testcase-form.component';

describe('TestcaseFormComponent', () => {
  let component: TestcaseFormComponent;
  let fixture: ComponentFixture<TestcaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestcaseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestcaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
