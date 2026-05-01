import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CdkTableModule } from '@angular/cdk/table';

export const USER_IMPORTS = [
  RouterModule,
  CommonModule, 
  ReactiveFormsModule,
  NgSelectModule,
  TabsModule,
  FormsModule,
  FontAwesomeModule,
  CdkTableModule
];