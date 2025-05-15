import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcaseDetailsComponent } from './testcase-details.component';

describe('TestcaseDetailsComponent', () => {
  let component: TestcaseDetailsComponent;
  let fixture: ComponentFixture<TestcaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestcaseDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestcaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
