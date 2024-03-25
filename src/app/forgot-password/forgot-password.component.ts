import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

constructor(private _authService:AuthService,private _router:Router){};
notValidEmail:boolean = false;
  isLoading:boolean = false;
forgotForm:FormGroup = new FormGroup({
  email:new FormControl(null,[Validators.email,Validators.required])
})

forgotMethod(){
  this.isLoading=true
this._authService.forgotPasswordAPI(this.forgotForm.value).subscribe({
  next:(res)=>{
    console.log(res);
    this._router.navigate(['varifyCode']);
  this.notValidEmail=false;  

    this.isLoading=false;

  },
  error:(err)=>{console.log(err);
  this.notValidEmail=true;  
  this.isLoading=false;

  }
})
}





}
