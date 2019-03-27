import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuyerRfqComponent } from './create-buyer-rfq.component';

describe('CreateBuyerRfqComponent', () => {
  let component: CreateBuyerRfqComponent;
  let fixture: ComponentFixture<CreateBuyerRfqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBuyerRfqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBuyerRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
