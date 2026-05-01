import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccountProfileImgComponent } from './components/account-profile-img/account-profile-img.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

export const ACCOUNT_IMPORTS = [
  RouterModule,
  CommonModule, 
  ReactiveFormsModule,
  NgSelectModule,
  TabsModule,
  FormsModule,
  FontAwesomeModule,
  ModalModule,
  TabsModule,
  AccountProfileImgComponent,
  TooltipModule
];