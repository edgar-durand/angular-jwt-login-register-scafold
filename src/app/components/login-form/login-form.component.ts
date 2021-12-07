import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NotificationsService} from "../../services/notifications.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    public notifications: NotificationsService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public router: Router,
    private snack: NotificationsService,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ngOnInit(): void {
  }

  get username(){
    return this.loginForm.controls['username'].value
  }

  get password(){
    return this.loginForm.controls['password'].value
  }

  public hasError (controlName: string, errorName: string): boolean {
    return this.loginForm.get(controlName)?.hasError(errorName) ?? false;
  };

  public getControl (controlName: string){
    return this.loginForm.get(controlName)
  }

  register(){
    this.router.navigate(['/register'])
  }

  async onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const response = await this.authService.signIn(this.username, this.password);
    if (response.result) {
      this.notifications.showAlert(`Welcome ${this.username}.`);
      await this.router.navigate(['/dashboard']);
    } else {
      const message = response.message ? response.message : 'Sorry, service is now unavailable. Please try later.'
      this.snack.showAlert( message, 5000);
    }
  }

}
