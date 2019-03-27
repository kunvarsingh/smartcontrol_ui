declare var $: any;
import { Component, OnInit } from '@angular/core';
import  {GlobalServiceService} from '../global-service.service';
import {Http} from '@angular/http';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-buyer-rfq',
  templateUrl: './edit-buyer-rfq.component.html',
  styleUrls: ['./edit-buyer-rfq.component.css']
})
export class EditBuyerRfqComponent implements OnInit {
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
  rfqs : any;
  supplierName : any;
  createdOn1 :any;
  updateButton : boolean = false;
  currentItem : any;
  status : any[] = [];
  minDate : any;

  constructor(private http:Http,
              private router: Router,
              private globalService : GlobalServiceService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  	 this.activatedRoute.queryParams.subscribe(params => {
       this.rfqId = params['id'];
        this.getBuyerRfqInfo(params['id']);
    });
    this.getSuppliers();
  	this.initCreateBuyerForm();
    this.getitemFormInit();
    this.currencies = this.globalService.getCurrencies();
    this.paymentTerms = this.globalService.getPaymentTerms();
    this.deliveryTerms = this.globalService.getDeliveryTerms();
    this.shipmentTerms = this.globalService.getShipmentTerms();
    this.status = this.globalService.getStatus();
    this.createdOn = this.globalService.getDate().minDate;
    this.createdBy = this.globalService.getUser().username;
    this.items =this.globalService.getItems();

    // this.itemForm.controls['buyerprice'].valueChanges.subscribe((change) => {
    //             const calculateAmount = (payoffs: any) => {
    //               this.itemForm.controls['value'].setValue(parseInt(payoffs)*this.itemForm.value.qty);
    //             }
    //             console.log(calculateAmount(this.itemForm.controls['buyerprice'].value));
    //           });

  }


  initCreateBuyerForm(){
  	 this.createForm= new FormGroup({
      rfqId : new FormControl(this.rfqId, Validators.required),
      currency : new FormControl('', Validators.required),
      supplier : new FormControl('', Validators.required),
      paymentTerm : new FormControl('', Validators.required),
      deliveryTerm :new FormControl('', Validators.required),
      shipmentTerm :new FormControl('', Validators.required),
      deliveryDate :new FormControl(this.globalService.getDate().minDate, Validators.required),
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
      qty : new FormControl('',  [Validators.required,Validators.min(1)]),
      itemname : new FormControl('', Validators.required),
      itemcode : new FormControl('', Validators.required),
      uom : new FormControl('', Validators.required),
      buyerprice : new FormControl('',  [Validators.required,Validators.min(1)]),
      vendorprice : new FormControl('', Validators.required),
      // value : new FormControl('', Validators.required),
    });
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
  
  addItem(){
    this.itemForm.reset();
    $('#myModal').modal('show'); 
    this.updateButton = false;
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
    this.itemForm.controls['vendorprice'].setValue(0);
    // this.itemForm.controls['value'].setValue(this.itemForm.value.qty*this.itemForm.value.buyerprice);
  }

  // totalVlaue(){
  //   this.itemForm.controls['value'].setValue(this.itemForm.value.qty*this.itemForm.value.buyerprice);
  // }

  deleteItem(item,index){
    this.totalitems.splice(index,1);
    this.globalService.showNotification("Item deleted successfully!.",4);
  }

  updateItem(){
    this.totalitems.splice(this.currentItem.index,1);
    this.totalitems.push(this.itemForm.value);
     $('#myModal').modal('hide'); 
     this.itemForm.reset();
     this.globalService.showNotification("Item updated successfully!.",2);
  }

  edit(item,index){
    this.updateButton = true;
    this.currentItem = {index : index, item : item};
    $('#myModal').modal('show');
    this.itemForm.controls['itemcode'].setValue(item.itemcode);
    this.itemForm.controls['itemname'].setValue(item.itemname);
    this.itemForm.controls['uom'].setValue(item.uom);
    this.itemForm.controls['qty'].setValue(item.qty);
    this.itemForm.controls['buyerprice'].setValue(item.buyerprice);
    this.itemForm.controls['vendorprice'].setValue(item.vendorprice);
    // this.itemForm.controls['value'].setValue(item.qty*item.buyerprice);
  }

  getBuyerRfqInfo(key){
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
        this.supplierName = data.supplierName;
        this.createdOn1 = data.createdOn;
        this.totalitems = JSON.parse(data.items);
        var date1 = new Date(data.deliveryDate);
        this.minDate = new Date(date1.getFullYear(), (date1.getMonth()+1), date1.getDate(), date1.getHours(), date1.getMinutes());
        debugger
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  createRfq(){
    this.loading = true;
    let url = this.globalService.basePath+"updateRfq";
    this.createForm.value.key = this.rfqId;
    this.createForm.value.createdOn = this.createdOn1;
    this.createForm.value.createdBy = this.globalService.getUser().id;
    this.createForm.value.items = this.totalitems;
    this.createForm.value.buyerName = this.globalService.getUser().username;
    this.createForm.value.supplierName = this.supplierName;
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
        this.router.navigateByUrl('/buyer/rfq');

      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  // }else{
  //   this.globalService.showNotification('Please send details!.',4);
  // }
  }

 close(){
    this.router.navigateByUrl('/buyer/rfq');
  }

  discard(){
    this.globalService.showNotification('Your changes have been reset!.',4);
    this.router.navigateByUrl('/buyer/rfq');
  }

}

