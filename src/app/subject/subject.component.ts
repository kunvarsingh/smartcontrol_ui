import { Component, OnInit } from '@angular/core';
import  {GlobalServiceService} from '../global-service.service';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
loading : boolean = false;
  countries : any[] = [];
  updateButton : boolean = false;
  countryForm :FormGroup;
  capitalForm :FormGroup;
   classes : any[] = [];
  board : any[] = [];
  userDetails :any;
  
  constructor(private http:Http,
              private router: Router,
              private globalService : GlobalServiceService) { }

  ngOnInit() {
    this.viewUser();
  	this.getCountryList();
    this.initSubjectForm();

  }

   initSubjectForm(){
     this.countryForm= new FormGroup({
      countryName : new FormControl('', Validators.required),
      capitalName : new FormControl('', Validators.required),
      // classId : new FormControl('', Validators.required),
      // boardId: new FormControl('', Validators.required),
    });

      this.capitalForm= new FormGroup({
      countryName : new FormControl('', Validators.required),
      capitalName : new FormControl('', Validators.required),
      // classId : new FormControl('', Validators.required),
      // boardId: new FormControl('', Validators.required),
    });

  }

  addCountry(){
    this.countryForm.reset();
    this.updateButton =false;
    $('#myModal').modal('show');
  }

  addCapital(){
    this.capitalForm.reset();
    this.updateButton =false;
    $('#myModal1').modal('show'); 
  }

  getCountryList(){
  	this.loading = true;
    let url = this.globalService.basePath+"user/getCountyList";
  	 this.globalService.PostRequest(url,{userId : this.globalService.getUser()._id}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.countries = JSON.parse(response[0].json._body).data;
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  viewUser(){
     this.loading = true;
    let url = this.globalService.basePath+"user/getuserById";
     this.globalService.PostRequest(url,{userId : this.globalService.getUser()._id}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.userDetails = JSON.parse(response[0].json._body).data;
        debugger;
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  // viewData(item,index){
  //    // this.updateButton =true;
  //   // $('#myModal').modal('show');
  //   debugger
  //   this.router.navigateByUrl('/data?id='+item._id+'&classId='+item.class._id)
  // }

  saveCountry(){
    $('#myModal').modal('hide');
    this.loading = true;
    let url = this.globalService.basePath+"user/addCountryBySuperAdmin";
    this.countryForm.value.addedBy = this.globalService.getUser().UserName;
    this.countryForm.value.userId = this.globalService.getUser()._id;
     this.globalService.PostRequest(url,this.countryForm.value).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.getCountryList();
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

    back(){
    this.router.navigateByUrl('/users');
  }
  saveCapital(){
     $('#myModal1').modal('hide');
    this.loading = true;
    let url = this.globalService.basePath+"user/updateCapital";
    this.capitalForm.value.addedBy = this.globalService.getUser().UserName;
    this.capitalForm.value.userId = this.globalService.getUser()._id;
    this.capitalForm.value.countryId = this.capitalForm.value.countryName;
     this.globalService.PostRequest(url,this.capitalForm.value).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.getCountryList();
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  deletCountry(item,index){
     this.loading = true;
    let url = this.globalService.basePath+"user/deleteCountry";
     this.globalService.PostRequest(url,{countryId : item._id}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.getCountryList();
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

}
