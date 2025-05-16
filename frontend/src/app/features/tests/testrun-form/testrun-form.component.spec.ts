import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestrunFormComponent } from './testrun-form.component';

describe('TestrunFormComponent', () => {
  let component: TestrunFormComponent;
  let fixture: ComponentFixture<TestrunFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestrunFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestrunFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
