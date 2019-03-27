import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Constant} from '.././constant';
declare var $: any;

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
name : any;
email : any;
keyForm: FormGroup;
 APIURL : any ;
 //= 'https://land-calculator-node.herokuapp.com/';
//APIURL : any = 'http://localhost:9090/';

  constructor(private http: Http, private fb: FormBuilder, private router : Router) {
    this.APIURL = Constant.endPoint;
   }

  ngOnInit() {
  	this.keyFormInit();
  }

   keyFormInit(){
      this.keyForm = this.fb.group({
            email : new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{2,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
            name: new FormControl('', Validators.required),
            mobileNo : new FormControl()
        });
    }


  generateKey(){
	let data = {name : this.name,email : this.email};  
  	this.http.post(this.APIURL+'appkey/generateKey',this.keyForm.value).subscribe((res)=>{
  		if(res.json().status===200){
  			this.showNotification('top','right',2,res.json().message);
  			this.keyFormInit();
        this.router.navigateByUrl('/appkeys');
  		}else{
  			this.showNotification('top','right',5,res.json().message);
  		}
  		// debugger;
  	})
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
