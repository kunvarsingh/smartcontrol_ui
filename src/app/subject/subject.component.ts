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
  subjects : any[] = [];
  updateButton : boolean = false;
  subjectForm :FormGroup;
   classes : any[] = [];
  board : any[] = [];
  
  constructor(private http:Http,
              private router: Router,
              private globalService : GlobalServiceService) { }

  ngOnInit() {
  	this.getClassList();
  	this.getSubjectList();
    this.initSubjectForm();
    this.getboardList();
  }

   initSubjectForm(){
     this.subjectForm= new FormGroup({
      subjectName : new FormControl('', Validators.required),
      classId : new FormControl('', Validators.required),
      boardId: new FormControl('', Validators.required),
    });
  }

  createSubject(){
    this.subjectForm.reset();
    this.updateButton =false;
    $('#myModal').modal('show');
    this.getClassList();
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


  getSubjectList(){
  	this.loading = true;
    let url = this.globalService.basePath+"admin/getAllSubjects";
  	 this.globalService.GetRequest(url).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.subjects = response[0].json.data;
        debugger;
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  editSubject(item,index){
     this.updateButton =true;
    $('#myModal').modal('show');
     this.subjectForm.controls['subjectName'].setValue(item.className);
  }

  viewData(item,index){
     // this.updateButton =true;
    // $('#myModal').modal('show');
    debugger
    this.router.navigateByUrl('/data?id='+item._id+'&classId='+item.class._id)
  }

  saveSubject(){
    $('#myModal').modal('hide');
    this.loading = true;
    let url = this.globalService.basePath+"admin/addSubjectForClass";
    this.subjectForm.value.uploadedBy = this.globalService.getUser().username;
     this.globalService.PostRequest(url,this.subjectForm.value).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.getSubjectList();
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  deleteSubject(item,index){
     this.loading = true;
    let url = this.globalService.basePath+"admin/deleteSubjectForClass";
     this.globalService.PostRequest(url,{subjectId : item._id}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.getSubjectList();
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  updateSubject(){

  }
}
