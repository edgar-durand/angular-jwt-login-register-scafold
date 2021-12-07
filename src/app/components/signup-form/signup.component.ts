import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {NotificationsService} from "../../services/notifications.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm = this.fb.group({
    email: [null, Validators.compose([Validators.email, Validators.required])],
    password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    confirmPassword: [null, Validators.compose([
      Validators.required, Validators.minLength(6)
    ])]
  }, {
    validator: this.passwordValidator('password', 'confirmPassword')
  });

  visible = false;
  visible2 = false;
  agree = false;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    public alert: NotificationsService
  ) {

  }

  async onSubmit(): Promise<void> {
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }
    const payload = {
      username: this.signupForm.value.email,
      password: this.signupForm.value.password
    }

    try {
      const response = await this.authService.signup(
        payload
      );
      if (!response.result) {
        this.alert.showAlert(response.message);
      } else if (response.result) {
        this.resetForm();
        this.router.navigate(['login']);
        this.alert.showAlert(response.message, 5000)
      }

    } catch (error) {
      this.signupForm.clearValidators()
      this.alert.showAlert((<any>error).message)
    }
  }

  resetForm(): void {
    this.signupForm.reset();
  }

  passwordValidator(pass: string, confirm: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[pass];
      const matchingControl = formGroup.controls[confirm];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
