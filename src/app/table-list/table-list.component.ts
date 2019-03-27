import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Constant} from '.././constant';
declare var $: any;

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
keysArray : any[] = [];
viewForm : FormGroup;
data : any;
 APIURL : any 
 //= 'https://land-calculator-node.herokuapp.com/';
//APIURL : any = 'http://localhost:9090/';

  constructor(private http : Http,private fb: FormBuilder) { 
       this.APIURL = Constant.endPoint;
  }

  ngOnInit() {
  	this.http.get(this.APIURL+'appkey/getAllKeys').subscribe((res)=>{
  		debugger;
  		if(res.json().status===200){
  			// alert(res.json().message);
  			this.keysArray =(res.json().data);
  			// this.showNotification('top','right',2,res.json().message);
  			
  		}else{
  			this.showNotification('top','right',4,res.json().message);
  			// alert(res.json().message);
  		}
  	});
  }

  formInit(){
    this.viewForm = this.fb.group({
           'email' : new FormControl(''),
           'name' : new FormControl('')
         });
  }

  viewKey(item, index){
    this.formInit();
    this.http.post(this.APIURL+'appkey/viewKeyById',{id : item._id}).subscribe((res)=>{
      if(res.json().status===200){
        debugger;
        this.data = res.json().data;
         // this.viewForm.value.name = res.json().data.name;
         // this.viewForm.value.email = res.json().data.email;
         $('#noticeModal').modal();

      }else{
        this.showNotification('top','right',4,res.json().message);
      }
    });
  }

  deleteKey(appkeyid){
    this.http.post(this.APIURL+'appkey/deleteKeyById',{id : appkeyid}).subscribe((res)=>{
      if(res.json().status===200){
        debugger;
        this.ngOnInit();
        $('#noticeModal').modal('hide');
        this.showNotification('top','right',2,res.json().message);
      }else{
        this.showNotification('top','right',4,res.json().message);
      }
    });
  }

  subscription(id:any){
    this.http.post(this.APIURL+'appkey/reneueKeyForYear',{id : id}).subscribe((res)=>{
      if(res.json().status===200){
        debugger;
        this.ngOnInit();
        $('#noticeModal').modal('hide');
        this.showNotification('top','right',2,res.json().message);
      }else{
        this.showNotification('top','right',4,res.json().message);
      }
    });
  }

    showNotification(from, align,color1,msg){
      const type = ['','info','success','warning','danger'];

      const color = color1;

      $.notify({
          icon: "notifications",
          message: msg

      },{
          type: type[color],
          timer: 4000,
          placement: {
              from: from,
              align: align
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }


}
