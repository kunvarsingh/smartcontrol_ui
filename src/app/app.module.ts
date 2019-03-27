import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthGuardService} from './auth-guard.service';
import { GlobalServiceService }  from   './global-service.service';
import { MessageService }  from   './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToasterModule, ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';
import { AgGridModule } from 'ag-grid-angular';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


import { LoginComponent } from './login/login.component';
import { BuyerRfqListComponent } from './buyer-rfq-list/buyer-rfq-list.component';
import { SupplierRfqlistComponent } from './supplier-rfqlist/supplier-rfqlist.component';
import { CreateBuyerRfqComponent } from './create-buyer-rfq/create-buyer-rfq.component';
import { CreateSupplierRfqComponent } from './create-supplier-rfq/create-supplier-rfq.component';
import { HeaderComponent } from './header/header.component';
import { EditBuyerRfqComponent } from './edit-buyer-rfq/edit-buyer-rfq.component';
import { EditSellerRfqComponent } from './edit-seller-rfq/edit-seller-rfq.component';

import { ClassComponent } from './class/class.component';
import { SubjectComponent } from './subject/subject.component';
import { DataComponent } from './data/data.component';
import { BoardComponent } from './board/board.component';
import { FormulaComponent } from './formula/formula.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BuyerRfqListComponent,
    SupplierRfqlistComponent,
    CreateBuyerRfqComponent,
    CreateSupplierRfqComponent,
    HeaderComponent,
    EditBuyerRfqComponent,
    EditSellerRfqComponent,
    ClassComponent,
    SubjectComponent,
    DataComponent,
    BoardComponent,
    FormulaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    AppRoutingModule,
    ToasterModule.forRoot(),
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    AgGridModule.withComponents(null),
    NgbModule.forRoot(),
    ToasterModule.forRoot(),
  ],
  providers: [ToasterService,AuthGuardService,GlobalServiceService,MessageService,AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
