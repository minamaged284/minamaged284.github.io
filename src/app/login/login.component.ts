import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

let passwordRegex : RegExp =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
errorMessage!:string; 
constructor(private _AuthService:AuthService,private _router:Router) {  
}
  isLoading! :boolean;

  loginSubmit(){
    this.isLoading = true;
this._AuthService.loginApi(this.loginForm.value).subscribe({
  next:(res)=>{console.log(res)
  this._router.navigate(['home']);
  this.isLoading=false;
  localStorage.setItem('uToken',res.token);
  
  
  this._AuthService.saveUserData();

  },
  error:(err)=>{console.log(err.error.message);
  this.errorMessage=err.error.message;
  this.isLoading=false;

  }
})

  }

loginForm : FormGroup = new FormGroup({
email: new FormControl(null,[Validators.required,Validators.email])
,password : new FormControl(null,[Validators.required,Validators.pattern(passwordRegex)])
})

forgotPassword(){
  this._router.navigate(['forgotPassword'])
}

}
