import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassComponent } from './class/class.component';
import { SubjectComponent } from './subject/subject.component';
import { DataComponent } from './data/data.component';

import { LoginComponent } from './login/login.component';
import { BuyerRfqListComponent } from './buyer-rfq-list/buyer-rfq-list.component';
import { SupplierRfqlistComponent } from './supplier-rfqlist/supplier-rfqlist.component';
import { CreateBuyerRfqComponent } from './create-buyer-rfq/create-buyer-rfq.component';
import { CreateSupplierRfqComponent } from './create-supplier-rfq/create-supplier-rfq.component';
import { EditBuyerRfqComponent } from './edit-buyer-rfq/edit-buyer-rfq.component';
import { EditSellerRfqComponent } from './edit-seller-rfq/edit-seller-rfq.component';

import { BoardComponent } from './board/board.component';
import { FormulaComponent } from './formula/formula.component';

import { AuthGuardService} from './auth-guard.service';

const routes: Routes = [
  // {path:'', component: TetComponent},
  { path: '', redirectTo : 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'buyer/rfq', component: BuyerRfqListComponent },
  { path: 'supplier/rfq', component: SupplierRfqlistComponent},
  // { path: 'viewContract', component: ViewContractComponent,canActivate: [AuthGuardService] },

  { path: 'buyer/createRfq', component: CreateBuyerRfqComponent},
  { path : 'supplier/createRfq', component : CreateSupplierRfqComponent},
  { path : 'supplier/editRfq', component : EditSellerRfqComponent},
  { path : 'buyer/editRfq', component : EditBuyerRfqComponent},

  {path : 'class', component : ClassComponent},
  {path : 'subject', component : SubjectComponent},
  {path : 'data', component : DataComponent},
  {path : 'board', component : BoardComponent},
  {path : 'formula', component : FormulaComponent}
];


@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}



