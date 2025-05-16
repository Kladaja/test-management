import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcycleDetailsComponent } from './testcycle-details.component';

describe('TestcycleDetailsComponent', () => {
  let component: TestcycleDetailsComponent;
  let fixture: ComponentFixture<TestcycleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestcycleDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestcycleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
