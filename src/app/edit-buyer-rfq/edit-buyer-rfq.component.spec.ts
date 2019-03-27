import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBuyerRfqComponent } from './edit-buyer-rfq.component';

describe('EditBuyerRfqComponent', () => {
  let component: EditBuyerRfqComponent;
  let fixture: ComponentFixture<EditBuyerRfqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBuyerRfqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBuyerRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
