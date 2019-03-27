declare var $: any;
import { Component, OnInit } from '@angular/core';
import  {GlobalServiceService} from '../global-service.service';
import  {MessageService} from '../message.service';

import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm  : FormGroup;
  loading : boolean = false;

  constructor(private http:Http,
              private router: Router,
              private globalService : GlobalServiceService,
              private _message : MessageService) { 
  }

  ngOnInit() {
  	$('#myModal').modal({backdrop: 'static',
    keyboard: false}); 
  	 this.loginFormInit();
  }

  close(){
  	// $('#myModal').modal('hide'); 
  	$('#myModal').modal('show'); 
  }

  loginFormInit(){
    this.loginForm= new FormGroup({
      email : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      // partytype : new FormControl('', Validators.required),
    });
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.login();
    }
  }

  login(){
  	 this.loading = true;
    let url = this.globalService.basePath+"user/login";

    if(this.loginForm.valid){
      // $('#myModal').modal('hide');
      // this.router.navigateByUrl('/class');
    this.globalService.PostRequestUnautorized(url,this.loginForm.value).subscribe(response=>{
      if(response[0].json.status==200){
        this.loading = false;
        this.globalService.setUserStatus(true);
        this._message.sendMessage(response[0].json.data);
        localStorage.setItem('user',JSON.stringify(response[0].json.data));
        localStorage.setItem('logout','yes');
        this.router.navigateByUrl('/class');
        $('#myModal').modal('hide');
        // if(response[0].json.data.partytype==='Buyer') this.router.navigateByUrl('/buyer/rfq');
        // else this.router.navigateByUrl('/supplier/rfq');

      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
	}else{
		this.globalService.showNotification('Please send details for login!.',4);
	}

  }

}
