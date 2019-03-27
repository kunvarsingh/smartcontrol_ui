import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSupplierRfqComponent } from './create-supplier-rfq.component';

describe('CreateSupplierRfqComponent', () => {
  let component: CreateSupplierRfqComponent;
  let fixture: ComponentFixture<CreateSupplierRfqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSupplierRfqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSupplierRfqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
