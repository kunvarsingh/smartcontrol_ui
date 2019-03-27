declare var $: any;
import { Component, OnInit } from '@angular/core';
import  {GlobalServiceService} from '../global-service.service';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-buyer-rfq',
  templateUrl: './create-buyer-rfq.component.html',
  styleUrls: ['./create-buyer-rfq.component.css']
})
export class CreateBuyerRfqComponent implements OnInit {
  createForm  : FormGroup;
  itemForm : FormGroup;
  loading : boolean = false;
  suppliers : any[];
  rfqId :any;
  currencies : any[];
  paymentTerms :any[];
  deliveryTerms :any[];
  shipmentTerms :any[];
  createdOn : any;
  createdBy : any;
  items : any[];
  totalitems : any[] = [];
  supplierName :any;
  updateButton : boolean = false;
  currentItem : any;
  private gridApi;
  minDate : any;

   // columnDefs = [
   //      {headerName: 'Make', field: 'make'},
   //      {headerName: 'Model', field: 'model'},
   //      {headerName: 'Price', field: 'price',editable : true}
   //  ];

      columnDefs = [
        {headerName: 'Item Code', field: 'itemcode'},
        {headerName: 'Item Name', field: 'itemname'},
        {headerName: 'UOM', field: 'uom'},
        {headerName: 'Qty', field: 'qty'},
        {headerName: 'Target Price', field: 'targetprice'},
        {headerName: 'Quote Price', field: 'quoteprice'},
    ];

    rowData = [];
    // [
    //     {make: 'Toyota', model: 'Celica', price: 35000},
    //     {make: 'Ford', model: 'Mondeo', price: 32000},
    //     {make: 'Porsche', model: 'Boxter', price: 72000}
    // ];


  constructor(private http:Http,
              private router: Router,
              private globalService : GlobalServiceService,private activatedRoute: ActivatedRoute) {

             

               }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
        this.rfqId = ('RFQ000')+(parseInt(params['id'])+1);
    });

  	this.initCreateBuyerForm();
    this.getitemFormInit();
    this.getSuppliers();
    this.currencies = this.globalService.getCurrencies();
    this.paymentTerms = this.globalService.getPaymentTerms();
    this.deliveryTerms = this.globalService.getDeliveryTerms();
    this.shipmentTerms = this.globalService.getShipmentTerms();
    this.createdOn = this.globalService.getDate().minDate;
    this.createdBy = this.globalService.getUser().username;
    this.items =this.globalService.getItems();
    this.minDate = new Date();
     // this.itemForm.controls['buyerprice'].valueChanges.subscribe((change) => {
     //            const calculateAmount = (payoffs: any) => {
     //              this.itemForm.controls['value'].setValue(parseInt(payoffs)*this.itemForm.value.qty);
     //            }
     //            console.log(calculateAmount(this.itemForm.controls['buyerprice'].value));
     //          });

  }

  initCreateBuyerForm(){
  	 this.createForm= new FormGroup({
      rfqId : new FormControl('', Validators.required),
      currency : new FormControl('', Validators.required),
      supplier : new FormControl('', Validators.required),
      paymentTerm : new FormControl('', Validators.required),
      deliveryTerm :new FormControl('', Validators.required),
      shipmentTerm :new FormControl('', Validators.required),
      // deliveryDate :new FormControl(this.globalService.getDate().minDate, Validators.required),
      deliveryDate :new FormControl('', Validators.required),
      quoteddeliveryDate : new FormControl(''),
      status :new FormControl('OPEN', Validators.required),
      createdOn :new FormControl('', Validators.required),
      createdBy :new FormControl('', Validators.required),
      updatedOn :new FormControl(''),
      updatedBy:new FormControl(''),
      comment:new FormControl(''),
    });
  }

  getitemFormInit(){
     this.itemForm= new FormGroup({
      qty : new FormControl('', [Validators.required,Validators.min(1)]),
      itemname : new FormControl('', Validators.required),
      itemcode : new FormControl('', Validators.required),
      uom : new FormControl('', Validators.required),
      buyerprice : new FormControl('', [Validators.required,Validators.min(1)]),
      vendorprice : new FormControl('', Validators.required),
      // value : new FormControl('', Validators.required),
    });
  }


  addItem(){
    this.updateButton =false;
    $('#myModal').modal('show'); 
    this.itemForm.reset();
  }

  saveItem(){
    this.rowData = [];
    if(this.itemForm.valid){
       this.totalitems.push(this.itemForm.value);
       this.rowData = this.totalitems;
       $('#myModal').modal('hide'); 
       this.globalService.showNotification("Item added successfully!",2);
       this.itemForm.reset();
     }else{
       this.globalService.showNotification("Please fill details!",4);
     }
  }

  edit(item,index){
    this.updateButton = true;
    this.currentItem = {index : index, item : item};
    $('#myModal').modal('show');
    this.itemForm.controls['itemcode'].setValue(item.itemcode);
    this.itemForm.controls['itemname'].setValue(item.itemcode);
    this.itemForm.controls['uom'].setValue(item.uom);
    this.itemForm.controls['qty'].setValue(item.qty);
    this.itemForm.controls['buyerprice'].setValue(item.buyerprice);
    this.itemForm.controls['vendorprice'].setValue(item.vendorprice);
    // this.itemForm.controls['value'].setValue(item.qty*item.buyerprice);
  }

  updateItem(){
    this.totalitems.splice(this.currentItem.index,1);
    this.totalitems.push(this.itemForm.value);
     $('#myModal').modal('hide'); 
     this.itemForm.reset();
  }

  chooseItem(event){
    // this.itemForm.value.itemcode = event.target.value;
    var curritem = this.items.filter((item) => {return item.code===event.target.value});
    this.itemForm.controls['itemcode'].setValue(curritem[0].code);
    this.itemForm.controls['itemname'].setValue(curritem[0].name);
    this.itemForm.controls['uom'].setValue(curritem[0].UOM);
    this.itemForm.controls['vendorprice'].setValue('0.00');
    // this.itemForm.controls['value'].setValue(this.itemForm.value.qty*this.itemForm.value.buyerprice);
  }

  // totalVlaue(){
  //   this.itemForm.controls['value'].setValue(this.itemForm.value.qty*this.itemForm.value.buyerprice);
  // }

  deleteItem(item,index){
    this.totalitems.splice(index,1);
    this.globalService.showNotification("Item deleted successfully!.",4);
    this.rowData = this.totalitems;
    this.itemForm.reset();
  }

  getSuppliers(){
    this.loading = true;
    let url = this.globalService.basePath+"getSupplierList?id="+this.globalService.getUser().id;
     this.globalService.GetRequest(url).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.suppliers = response[0].json.list[0].vendors;
      }else{
        this.loading = false;
      }
    });
  }

  chooseBuyer(event){
    let data = this.suppliers.filter((item) =>{return item.id==event.target.value});
    this.createForm.value.supplierName = data[0].username;
    this.supplierName = data[0].username;
  }

  createRfq(){
  	this.loading = true;
    let url = this.globalService.basePath+"createRfq";
    this.createForm.value.createdOn = this.globalService.getDate().minDate;
    this.createForm.value.createdBy = this.globalService.getUser().id;
    this.createForm.value.items = this.totalitems;
    this.createForm.value.buyerName = this.globalService.getUser().username;
    this.createForm.value.supplierName = this.supplierName;

    let totalvalue = 0;
    this.totalitems.forEach( data => totalvalue = totalvalue + parseInt(data.buyerprice));
    this.createForm.value.value = totalvalue.toString();

     let totalqty = 0;
    this.totalitems.forEach( data => totalqty = totalqty + parseInt(data.qty));
    this.createForm.value.qty = totalqty.toString();

    if(this.createForm.value.supplier!='' && this.createForm.value.currency!='' && this.createForm.value.paymentTerm!=''
    && this.createForm.value.deliveryTerm!='' && this.createForm.value.shipmentTerm!='' &&  this.createForm.value.deliveryDate && this.totalitems.length){
    this.globalService.PostRequestUnautorized(url,this.createForm.value).subscribe(response=>{
      if(response[0].json.status===200){
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,2);
        this.router.navigateByUrl('/buyer/rfq');

      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
	}else{
		this.globalService.showNotification('Fill all mandatory fields!.',4);
	}

  }

  close(){
    this.router.navigateByUrl('/buyer/rfq');
  }

  discard(){
    this.globalService.showNotification('Your changes have been reset!.',4);
    this.router.navigateByUrl('/buyer/rfq');
  }
}
