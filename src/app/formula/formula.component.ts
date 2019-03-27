import { Component, OnInit } from '@angular/core';
import  {GlobalServiceService} from '../global-service.service';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit {

 loading : boolean = false;
  formulaes : any[] = [];
  updateButton : boolean = false;
  formulaForm :FormGroup;
  formulaesSubjects : any[] = [];
  formulaName : any;

  constructor(private http:Http,
              private router: Router,
              private globalService : GlobalServiceService) { }

  ngOnInit() {
  	this.getformulaList();
    this.initformulaForm();
  }

   initformulaForm(){
     this.formulaForm= new FormGroup({
      formulaName : new FormControl('', Validators.required),
    });
  }

  createformula(){
    this.formulaForm.reset();
    this.updateButton =false;
    $('#myModal').modal('show');
  }

  getformulaList(){
  	this.loading = true;
    let url = this.globalService.basePath+"admin/getAllformulaes";
  	 this.globalService.GetRequest(url).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.formulaes = response[0].json.data;
        debugger;
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  editformula(item,index){
     this.updateButton =true;
    $('#myModal').modal('show');
     this.formulaForm.controls['formulaName'].setValue(item.formulaName);
  }

  viewformula(item,index){
    $('#myModal1').modal('show');
     this.loading = true;
     this.formulaName = item.formulaName;
    let url = this.globalService.basePath+"admin/getAllSubjectsForformula";
     this.globalService.PostRequest(url,{formulaId : item._id}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.formulaesSubjects = JSON.parse(response[0].json._body).data;
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  saveformula(){
    $('#myModal').modal('hide');
    this.loading = true;
    let url = this.globalService.basePath+"admin/addformula";
    this.formulaForm.value.uploadedBy = this.globalService.getUser().username;
     this.globalService.PostRequest(url,this.formulaForm.value).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.getformulaList();
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  deleteformula(item,index){
     this.loading = true;
    let url = this.globalService.basePath+"admin/deleteformula";
     this.globalService.PostRequest(url,{formulaId : item._id}).subscribe(response=>{
      if(response[0].status===200){
        this.loading = false;
        this.globalService.showNotification(JSON.parse(response[0].json._body).message,2);
        this.getformulaList();
      }else{
        this.loading = false;
        this.globalService.showNotification(response[0].json.message,4);
      }
    });
  }

  updateformula(){

  }

}
