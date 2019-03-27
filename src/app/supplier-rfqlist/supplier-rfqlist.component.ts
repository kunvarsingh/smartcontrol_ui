import { Component, OnInit } from '@angular/core';
import  {GlobalServiceService} from '../global-service.service';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-supplier-rfqlist',
  templateUrl: './supplier-rfqlist.component.html',
  styleUrls: ['./supplier-rfqlist.component.css']
})
export class SupplierRfqlistComponent implements OnInit {
  loading : boolean = false;
  rfqs : any[] = [];
   

  constructor(private http:Http,
              private router: Router,
              private globalService : GlobalServiceService) { }
  
  ngOnInit() {
  	this.getSupplierRfqList();
  
  }


  getSupplierRfqList(){
  	this.loading = true;
    let url = this.globalService.basePath+"getSupplierRfqList?id="+this.globalService.getUser().id;
     this.globalService.GetRequest(url).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        // this.rfqs = response[0].json.list;
         var obj = {};
        var data = response[0].json.list;
        for(var i=0;i<data.length;i++){
          obj['Key'] = data[i].Key;
          obj['rfqId'] = data[i].Record.rfqId;
          obj['createdBy'] = data[i].Record.buyerName;
          obj['createdOn'] = data[i].Record.createdOn;
          obj['status'] = data[i].Record.status;
          obj['buyerName'] = data[i].Record.buyerName;
          obj['supplier'] = data[i].Record.supplierName;
          obj['updatedBy'] = data[i].Record.updatedBy;
          obj['updatedOn'] = data[i].Record.updatedOn;
          obj['qty'] = data[i].Record.qty;
          obj['value'] = data[i].Record.value;
          this.rfqs.push(obj);
          obj = {};
        }
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }


  // createRfq(){
  //   this.router.navigateByUrl('supplier/createRfq'+this.rfqs.length);
  // }

   viewRfq(item,index){
    // need to work here
    this.router.navigateByUrl('supplier/editRfq?id='+item.Key);
  }

}
