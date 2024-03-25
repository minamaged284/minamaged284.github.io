import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {  Router } from '@angular/router';

let passwordRegex : RegExp =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent {





constructor(private _authService:AuthService, private _router:Router){}


  isLoading : boolean =false;
  errorMessage :boolean=false;

resetPasswordMethod(){
  this.isLoading=true;
this._authService.resetPasswordAPI(this.resetPasswordForm.value).subscribe({
  next:(res)=>{console.log(res);
    this._router.navigate(['login'])
  this.isLoading=false;
  },
  error:(err)=>{console.log(err);

    
  this.errorMessage=true;
  this.isLoading=false;
  
  
  }

})
}

resetPasswordForm : FormGroup = new FormGroup ({
  newPassword :new FormControl(null,[Validators.required,Validators.pattern(passwordRegex)]),
  email :new FormControl(null,[Validators.required,Validators.email]),

  rePassword :new FormControl(null,[Validators.required]),

}, {validators: [this.matching]} as FormControlOptions)


matching(group:FormGroup){

  if(group.get('rePassword')?.value==''){
    group.get('rePassword')?.setErrors({required:true})
  }



  else if(group.get('newPassword')?.value!=group.get('rePassword')?.value){
    group.get('rePassword')?.setErrors({matchingError:true})

  }

}



}
