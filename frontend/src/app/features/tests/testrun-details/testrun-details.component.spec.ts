import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestrunDetailsComponent } from './testrun-details.component';

describe('TestrunDetailsComponent', () => {
  let component: TestrunDetailsComponent;
  let fixture: ComponentFixture<TestrunDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestrunDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestrunDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
