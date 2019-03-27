import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSellerRfqComponent } from './edit-seller-rfq.component';

describe('EditSellerRfqComponent', () => {
  let component: EditSellerRfqComponent;
  let fixture: ComponentFixture<EditSellerRfqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSellerRfqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSellerRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
