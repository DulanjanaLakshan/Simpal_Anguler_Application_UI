import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmiit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);

      // send the object to database

    }else{

      // console.log("Form is not valid..!");

      // throw the error using toaster and with required fields
      this.validateAllFormFillds(this.loginForm)
      alert("Your Form Is Invalid")
    }
  }

  private validateAllFormFillds(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control?.markAsDirty({onlySelf: true});
      } else if (control instanceof FormGroup) {
          this.validateAllFormFillds(control);
      }
    });
  }
}
