import { Component, OnInit } from '@angular/core';
import  {GlobalServiceService} from '../global-service.service';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
 loading : boolean = false;
  board : any[] = [];
  updateButton : boolean = false;
  boardForm :FormGroup;
  boardesSubjects : any[] = [];
  boardName1 : any;

  constructor(private http:Http,
              private router: Router,
              private globalService : GlobalServiceService) { }

  ngOnInit() {
  	this.getboardList();
    this.initboardForm();
  }

   initboardForm(){
     this.boardForm= new FormGroup({
      boardName : new FormControl('', Validators.required),
    });
  }

  createBoard(){
    this.boardForm.reset();
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

  editBoard(item,index){
     this.updateButton =true;
    $('#myModal').modal('show');
     this.boardForm.controls['boardName'].setValue(item.boardName);
  }

  viewBoard(item,index){
    $('#myModal1').modal('show');
     this.loading = true;
     this.boardName1 = item.boardName;
    let url = this.globalService.basePath+"admin/getAllSubjectsForboard";
     this.globalService.PostRequest(url,{boardId : item._id}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.boardesSubjects = JSON.parse(response[0].json._body).data;
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  saveBoard(){
    $('#myModal').modal('hide');
    this.loading = true;
    let url = this.globalService.basePath+"admin/addboard";
    this.boardForm.value.uploadedBy = this.globalService.getUser().username;
     this.globalService.PostRequest(url,this.boardForm.value).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.getboardList();
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  deleteBoard(item,index){
     this.loading = true;
    let url = this.globalService.basePath+"admin/deleteBoard";
     this.globalService.PostRequest(url,{boardId : item._id}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.getboardList();
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  updateboard(){

  }


}
