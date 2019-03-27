declare var $: any;
import { Component, OnInit } from '@angular/core';
import  {GlobalServiceService} from '../global-service.service';
import {Http} from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
 subjectId : any;
 loading : boolean = false;
 videos : any[] = [];
 videoForm :FormGroup;
 classes : any[] = [];
 image : any;
 classId : any;
 images : any[] = [];

  constructor(private http:Http,
              private router: Router,
              private globalService : GlobalServiceService,private activatedRoute: ActivatedRoute,public sanitizer: DomSanitizer) {
  	
  }

  ngOnInit() {
  	this.activatedRoute.queryParams.subscribe(params => {
      debugger
       this.subjectId = params['id'];
       this.classId = params['classId'];
        this.getVideoData(this.subjectId);
        this.getImageData();
    });
    this.initVideoForm();
  }

     initVideoForm(){
     this.videoForm= new FormGroup({
      link : new FormControl('', Validators.required)
    });
  }

  back(){
    this.router.navigateByUrl('/subject');

  }

  addImage(){
    $('#addImage').modal('show');
  }

  addPDF(){

  } 

  saveImage(){
    $('#addImage').modal('hide');
    this.loading = true;
    let url = this.globalService.basePath+"admin/uploadImage";
     this.globalService.PostRequest(url,{image : this.image.split('base64,')[1],uploadedBy : 'Admin',subjectId : this.subjectId,classId :this.classId}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.image = '';
        this.globalService.showNotification(response[0].json.message,2);
        this.getImageData();
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  changeListener($event) : void {
  this.readThis($event.target);
}

readThis(inputValue: any): void {
  var file:File = inputValue.files[0];
  var myReader:FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
  }
  myReader.readAsDataURL(file);
}


  addVideo(){
    this.videoForm.reset();
    $('#myModal').modal('show');
    this.getClassList();
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

  getVideoData(id){
  	this.loading = true;
    let url = this.globalService.basePath+"admin/getSubjectYoutubeLink";
     this.globalService.PostRequest(url,{subject : id}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.videos = JSON.parse(response[0].json._body).data;
        debugger
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

    getImageData(){
    this.loading = true;
    let url = this.globalService.basePath+"admin/getAllImage";
     this.globalService.PostRequest(url,{subjectId : this.subjectId, classId : this.classId}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.images = JSON.parse(response[0].json._body).data;
        debugger
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }



   saveVideo(){
    $('#myModal').modal('hide');
    this.loading = true;
    this.videoForm.value.subject = this.subjectId;
    let url = this.globalService.basePath+"admin/createYoutubeLink";
    this.videoForm.value.uploadedBy = this.globalService.getUser().username;
     this.globalService.PostRequest(url,this.videoForm.value).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.getVideoData(this.subjectId);
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  deleteSubject(item,index){
     this.loading = true;
    let url = this.globalService.basePath+"admin/deleteYoutubeLink";
     this.globalService.PostRequest(url,{linkId : item._id}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.ngOnInit();
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

}
