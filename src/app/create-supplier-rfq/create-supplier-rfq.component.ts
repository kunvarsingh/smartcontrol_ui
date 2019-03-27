declare var $: any;
import { Component, OnInit } from '@angular/core';
import  {GlobalServiceService} from '../global-service.service';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-supplier-rfq',
  templateUrl: './create-supplier-rfq.component.html',
  styleUrls: ['./create-supplier-rfq.component.css']
})
export class CreateSupplierRfqComponent implements OnInit {
  supplierForm  : FormGroup;
  loading : boolean = false;

  constructor(private http:Http,
              private router: Router,
              private globalService : GlobalServiceService) { }

  ngOnInit() {
  	this.initCreateSupplierForm();
  }

  initCreateSupplierForm(){
  	
  }
  
  createRfq(){
      this.loading = true;
    let url = this.globalService.basePath+"api/createRfq";
    if({}){
    this.globalService.PostRequestUnautorized(url,{}).subscribe(response=>{
      debugger;
      if(response[0].json.status===200){
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,2);
        
        if(response[0].json.data==='Buyer') this.router.navigateByUrl('/buyer/rfq');
        else this.router.navigateByUrl('/supplier/rfq');

      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }else{
    this.globalService.showNotification('Please send details!.',4);
  }
  }
}
