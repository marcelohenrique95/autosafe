import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPartnerComponent } from './register-partner.component';

describe('RegisterClientComponent', () => {
  let component: RegisterPartnerComponent;
  let fixture: ComponentFixture<RegisterPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
