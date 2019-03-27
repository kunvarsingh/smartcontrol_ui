import { Component, OnInit } from '@angular/core';
import  {GlobalServiceService} from '../global-service.service';
import {Http} from '@angular/http';
declare var $: any;
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-seller-rfq',
  templateUrl: './edit-seller-rfq.component.html',
  styleUrls: ['./edit-seller-rfq.component.css']
})
export class EditSellerRfqComponent implements OnInit {
  loading : boolean = false;
  rfqs : any[];
  rfqId :any;
  createForm  : FormGroup;
  itemForm : FormGroup;
  suppliers : any[];
  currencies : any[];
  paymentTerms :any[];
  deliveryTerms :any[];
  shipmentTerms :any[];
  createdOn : any;
  createdBy : any;
  items : any[];
  totalitems : any[] = [];
  buyerName : any;
  changedPrice : any;
  minDate : any;

   columnDefs = [
        {headerName: 'Item Code', field: 'itemcode',width:200},
        {headerName: 'Item Name', field: 'itemname',width:200},
        {headerName: 'UOM', field: 'uom',width:100,type: "numericColumn"},
        {headerName: 'Qty', field: 'qty',width:100,type: "numericColumn"},
        {headerName: 'Target Price', field: 'buyerprice',width:200,type: "numericColumn"},
        {headerName: 'Quote Price', field: 'vendorprice',editable : true,width:250,type: "numericColumn"}
    ];

    rowData = [];
    // [
    //     {make: 'Toyota', model: 'Celica', price: 35000},
    //     {make: 'Ford', model: 'Mondeo', price: 32000},
    //     {make: 'Porsche', model: 'Boxter', price: 72000}
    // ];


  constructor(private http:Http,
              private router: Router,
              private globalService : GlobalServiceService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  	this.getSuppliers();

  	 this.activatedRoute.queryParams.subscribe(params => {
        this.rfqId = (params['id']);
        this.getSupplierRfqInfo(this.rfqId);
    });
     
    this.initCreateBuyerForm();
    this.getitemFormInit();
    this.currencies = this.globalService.getCurrencies();
    this.paymentTerms = this.globalService.getPaymentTerms();
    this.deliveryTerms = this.globalService.getDeliveryTerms();
    this.shipmentTerms = this.globalService.getShipmentTerms();
    // this.createdOn = this.globalService.getDate().minDate;
    // this.createdBy = this.globalService.getUser().username;
    this.items =this.globalService.getItems();

  }
  viewRfq(){
  	this.router.navigateByUrl('/supplier/rfq');
  }

  initCreateBuyerForm(){
     this.createForm= new FormGroup({
      rfqId : new FormControl(this.rfqId, Validators.required),
      currency : new FormControl('', Validators.required),
      supplier : new FormControl('', Validators.required),
      paymentTerm : new FormControl('', Validators.required),
      deliveryTerm :new FormControl('', Validators.required),
      shipmentTerm :new FormControl('', Validators.required),
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
      qty : new FormControl('', Validators.required),
      itemname : new FormControl('', Validators.required),
      itemcode : new FormControl('', Validators.required),
      uom : new FormControl('', Validators.required),
      buyerprice : new FormControl('', Validators.required),
      venderprice : new FormControl('', Validators.required),
      value : new FormControl('', Validators.required),
    });
  }


  getSuppliers(){
    this.loading = true;
    let url = this.globalService.basePath+"getAllSuppliers";
     this.globalService.GetRequest(url).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.suppliers = response[0].json.list;
      }else{
        this.loading = false;
      }
    });
  }

  addItem(){
    $('#myModal').modal('show'); 
  }

  saveItem(){
    if(this.itemForm.valid){
       this.totalitems.push(this.itemForm.value);
       $('#myModal').modal('hide'); 
       this.globalService.showNotification("Item added successfully!",2);
       this.itemForm.reset();
     }else{
       this.globalService.showNotification("Please fill details!",4);
     }
  }

  chooseItem(event){
    // this.itemForm.value.itemcode = event.target.value;
    var curritem = this.items.filter((item) => {return item.code===event.target.value});
    this.itemForm.controls['itemcode'].setValue(curritem[0].code);
    this.itemForm.controls['itemname'].setValue(curritem[0].name);
    this.itemForm.controls['uom'].setValue(curritem[0].UOM);
    this.itemForm.controls['venderprice'].setValue(0);
    this.itemForm.controls['value'].setValue(this.itemForm.value.qty*this.itemForm.value.buyerprice);
  }

  totalVlaue(){
    this.itemForm.controls['value'].setValue(this.itemForm.value.qty*this.itemForm.value.buyerprice);
  }

  deleteItem(item,index){
    this.totalitems.splice(index,1);
    this.globalService.showNotification("Item deleted successfully!.",4);
  }

  save(item,index){
   // let objIndex = this.totalitems.findIndex((obj => obj.itemcode === item.itemcode));
   // // this.totalitems.splice(objIndex,1);
   // delete this.totalitems[objIndex]['venderprice'];
   // this.totalitems[objIndex].vendorprice = $('#changePrice'+index).val();
   // this.totalitems = this.totalitems;
   // this.globalService.showNotification('Price saved!.',2);
  }

  getSupplierRfqInfo(key){
    this.loading = true;
    let url = this.globalService.basePath+"getRfqInfoById?key="+key;
     this.globalService.GetRequest(url).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.rfqs = response[0].json.list;
        let data = response[0].json.list;
        this.createForm.controls['rfqId'].setValue(data.rfqId);
        this.createForm.controls['comment'].setValue(data.comment);
        this.createForm.controls['supplier'].setValue(data.supplier);
        this.createForm.controls['currency'].setValue(data.currency);
        this.createForm.controls['paymentTerm'].setValue(data.paymentTerm);
        this.createForm.controls['deliveryTerm'].setValue(data.deliveryTerm);
        this.createForm.controls['shipmentTerm'].setValue(data.shipmentTerm);
        this.createForm.controls['deliveryDate'].setValue(data.deliveryDate);
        this.createForm.controls['quoteddeliveryDate'].setValue(data.quoteddeliveryDate);
        this.createForm.controls['status'].setValue(data.status);
        this.createForm.controls['createdOn'].setValue(data.createdOn);
        this.createForm.controls['createdBy'].setValue(data.buyerName);
        this.createForm.controls['updatedOn'].setValue(data.updatedOn);
        this.createForm.controls['updatedBy'].setValue(data.updatedBy);
        this.buyerName = data.buyerName;
        this.createdBy = data.createdBy;
        this.createdOn = data.createdOn;
        this.totalitems = JSON.parse(data.items);
        this.rowData = this.totalitems;
        var date1 = new Date(data.deliveryDate);
        this.minDate = new Date(date1.getFullYear(), (date1.getMonth()+1), date1.getDate(), date1.getHours(), date1.getMinutes());
        
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  createRfq(){
    if(this.createForm.value.quoteddeliveryDate){
        this.loading = true;
        let url = this.globalService.basePath+"updateRfq";
        this.createForm.value.key = this.rfqId;
        this.createForm.value.createdOn = this.createdOn;
        this.createForm.value.createdBy = this.createdBy;
        this.createForm.value.buyerName = this.buyerName;
        // this.createForm.value.items = this.totalItems;
        this.createForm.value.items = this.rowData;
        this.createForm.value.supplierName = this.globalService.getUser().username;
        this.createForm.value.supplier = this.globalService.getUser().id;
        this.createForm.value.updatedOn = this.globalService.getDate().minDate;
        this.createForm.value.updatedBy = this.globalService.getUser().username;

          let totalvalue = 0;
        this.totalitems.forEach( data => totalvalue = totalvalue + parseInt(data.buyerprice));
        this.createForm.value.value = totalvalue.toString();

         let totalqty = 0;
        this.totalitems.forEach( data => totalqty = totalqty + parseInt(data.qty));
        this.createForm.value.qty = totalqty.toString();

        // if(this.createForm.valid){
        this.globalService.PostRequestUnautorized(url,this.createForm.value).subscribe(response=>{
          if(response[0].json.status===200){
            this.loading = false;
            this.globalService.showNotification(response[0].json.message,2);
            this.router.navigateByUrl('/supplier/rfq');

          }else{
            this.loading = false;
            this.globalService.showNotification(response[0].json.message,4);
          }
        });
      // }else{
      //   this.globalService.showNotification('Please send details!.',4);
      // }
    }else{
      this.globalService.showNotification('Please fill quoted delivery date!.',4);
    }
  }


 close(){
    this.router.navigateByUrl('/supplier/rfq');
  }

  discard(){
    this.globalService.showNotification('Your changes have been reset!.',4);
    this.router.navigateByUrl('/supplier/rfq');
  }
  
}
