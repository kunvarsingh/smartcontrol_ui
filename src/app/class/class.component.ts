import { Component, OnInit } from '@angular/core';
import  {GlobalServiceService} from '../global-service.service';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  loading : boolean = false;
  users : any[] = [];
  updateButton : boolean = false;
  adminForm :FormGroup;
  classesSubjects : any[] = [];
  className : any;
  board : any[] = [];
  roles : any[] = [];

  constructor(private http:Http,
              private router: Router,
              private globalService : GlobalServiceService) { }

  ngOnInit() {
  	this.getallUsers();
    this.initClassForm();
  }

   initClassForm(){
     this.adminForm= new FormGroup({
      email : new FormControl('', Validators.required),
      username : new FormControl('', Validators.required),
    });
  }

  createAdmin(){
    this.adminForm.reset();
    this.updateButton =false;
    $('#myModal').modal('show');
  }


  getallUsers(){
  	this.loading = true;
    let url = this.globalService.basePath+"user/getallUsers";
  	 this.globalService.GetRequest(url).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.users = response[0].json.data;
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  addRole(role){
    let status = this.roles.findIndex((item)=>{ return item===role});
    if(status==-1){
      this.roles.push(role);
    }else{
      this.roles.splice(status,1);
    }
  }

  editClass(item,index){
     this.updateButton =true;
    $('#myModal').modal('show');
     this.adminForm.controls['className'].setValue(item.className);
  }

  viewUser(item,index){
    $('#myModal1').modal('show');
     this.loading = true;
     this.className = item.UserName;
    let url = this.globalService.basePath+"user/getuserById";
     this.globalService.PostRequest(url,{userId : item._id}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.classesSubjects = JSON.parse(response[0].json._body).data;
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  saveUser(){
    $('#myModal').modal('hide');
    this.loading = true;
    let url = this.globalService.basePath+"user/createAdmin";
    this.adminForm.value.uploadedBy = this.globalService.getUser().UserName;
    this.adminForm.value.roles = this.roles;
     this.globalService.PostRequest(url,this.adminForm.value).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.getallUsers();
        this.roles = [];
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  deleteUser(item,index){
     this.loading = true;
    let url = this.globalService.basePath+"user/deleteUser";
     this.globalService.PostRequest(url,{userId : item._id}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.getallUsers();
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }
}
