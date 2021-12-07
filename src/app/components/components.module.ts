import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginFormComponent} from "./login-form/login-form.component";
import {MaterialModule} from "../material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SignupComponent} from "./signup-form/signup.component";



@NgModule({
  declarations: [
    LoginFormComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    LoginFormComponent,
    SignupComponent
  ]
})
export class ComponentsModule { }
