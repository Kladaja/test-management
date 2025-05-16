import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcycleManagementComponent } from './testcycle-management.component';

describe('TestcycleManagementComponent', () => {
  let component: TestcycleManagementComponent;
  let fixture: ComponentFixture<TestcycleManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestcycleManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestcycleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
