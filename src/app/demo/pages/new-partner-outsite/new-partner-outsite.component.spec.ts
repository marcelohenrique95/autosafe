import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPartnerOutsiteComponent } from './new-partner-outsite.component';

describe('NewPartnerOutsiteComponent', () => {
  let component: NewPartnerOutsiteComponent;
  let fixture: ComponentFixture<NewPartnerOutsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPartnerOutsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPartnerOutsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
