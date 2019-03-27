import { Component, OnInit } from '@angular/core';
import  {GlobalServiceService} from '../global-service.service';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-buyer-rfq-list',
  templateUrl: './buyer-rfq-list.component.html',
  styleUrls: ['./buyer-rfq-list.component.css']
})
export class BuyerRfqListComponent implements OnInit {
  loading : boolean = false;
  rfqs : any[] = [];
  qty : any;
  value :any;

  constructor(private http:Http,
              private router: Router,
              private globalService : GlobalServiceService) { }

  ngOnInit() {
  	this.getBuyerRfqList();
  }

  createRfq(){
    this.router.navigateByUrl('buyer/createRfq?id='+this.rfqs.length);
  }

  getBuyerRfqList(){
  	this.loading = true;
    let url = this.globalService.basePath+"getRfqsById?id="+this.globalService.getUser().id;
  	 this.globalService.GetRequest(url).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        // this.rfqs = response[0].json;

        var obj = {};
        var data = response[0].json;
        for(var i=0;i<data.length;i++){
          obj['Key'] = data[i].Key;
          obj['rfqId'] = data[i].Record.rfqId;
          obj['createdBy'] = data[i].Record.buyerName;
          obj['createdOn'] = data[i].Record.createdOn;
          obj['status'] = data[i].Record.status;
          obj['supplier'] = data[i].Record.supplierName;
          obj['updatedBy'] = data[i].Record.updatedBy;
          obj['updatedOn'] = data[i].Record.updatedOn;
          obj['qty'] = data[i].Record.qty;
          obj['value'] = data[i].Record.value;
          // if(data[i].Record.items!=' '){
          // var items = JSON.parse(data[i].Record.items);
          // obj['qty'] = items.filter((item) => qty = qty+item.qty);
          // }
          this.rfqs.push(obj);
          obj = {};
        }

      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  viewRfq(item,index){
    // need to work here
    this.router.navigateByUrl('buyer/editRfq?id='+item.Key);
  }

}
