import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot}from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
singupForm : FormGroup;

 constructor(private http : Http,private fb: FormBuilder,private router: Router) { 

  }

  ngOnInit() {
  	this.formInit();
  }


  formInit(){
    this.singupForm = this.fb.group({
      name : new FormControl(''),
      email : new FormControl(''),
      password : new FormControl(''),
      confirmpassword : new FormControl(''),
      mobileNumber : new FormControl('')
    })
  }

  signup(){
      this.http.post('http://localhost:5000/api/register',this.singupForm.value).subscribe((res)=>{
      if(res.json().status===200){
        this.showNotification('top','right',2,'Logged in successfully!.');
        this.router.navigate(['/login']);
      }else{
        this.showNotification('top','right',4,res.json().msg);
      }
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

login(){
  
}

}

