import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerRfqListComponent } from './buyer-rfq-list.component';

describe('BuyerRfqListComponent', () => {
  let component: BuyerRfqListComponent;
  let fixture: ComponentFixture<BuyerRfqListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerRfqListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerRfqListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
