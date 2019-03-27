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
  classes : any[] = [];
  updateButton : boolean = false;
  classForm :FormGroup;
  classesSubjects : any[] = [];
  className : any;
  board : any[] = [];

  constructor(private http:Http,
              private router: Router,
              private globalService : GlobalServiceService) { }

  ngOnInit() {
  	this.getClassList();
    this.initClassForm();
    this.getboardList();
  }

   initClassForm(){
     this.classForm= new FormGroup({
      className : new FormControl('', Validators.required),
      boardId : new FormControl('', Validators.required),
    });
  }

  createClass(){
    this.classForm.reset();
    this.updateButton =false;
    $('#myModal').modal('show');
  }


  getboardList(){
    this.loading = true;
    let url = this.globalService.basePath+"admin/getAllBoards";
     this.globalService.GetRequest(url).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.board = response[0].json.data;
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  getClassList(){
  	this.loading = true;
    let url = this.globalService.basePath+"admin/getAllClasses";
  	 this.globalService.GetRequest(url).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.classes = response[0].json.data;
        debugger;
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  editClass(item,index){
     this.updateButton =true;
    $('#myModal').modal('show');
     this.classForm.controls['className'].setValue(item.className);
  }

  viewClass(item,index){
    $('#myModal1').modal('show');
     this.loading = true;
     this.className = item.className;
    let url = this.globalService.basePath+"admin/getAllSubjectsForClass";
     this.globalService.PostRequest(url,{classId : item._id}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.classesSubjects = JSON.parse(response[0].json._body).data;
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  saveClass(){
    $('#myModal').modal('hide');
    this.loading = true;
    let url = this.globalService.basePath+"admin/addClass";
    this.classForm.value.uploadedBy = this.globalService.getUser().username;
     this.globalService.PostRequest(url,this.classForm.value).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.getClassList();
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  deleteClass(item,index){
     this.loading = true;
    let url = this.globalService.basePath+"admin/deleteClass";
     this.globalService.PostRequest(url,{classId : item._id}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.getClassList();
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  updateClass(){

  }

}
