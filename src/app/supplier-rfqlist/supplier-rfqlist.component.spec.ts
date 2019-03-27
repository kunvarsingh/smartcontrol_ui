import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRfqlistComponent } from './supplier-rfqlist.component';

describe('SupplierRfqlistComponent', () => {
  let component: SupplierRfqlistComponent;
  let fixture: ComponentFixture<SupplierRfqlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierRfqlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierRfqlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
