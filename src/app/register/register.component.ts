import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { group } from '@angular/animations';



let passwordRegex : RegExp =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
let nameRegex : RegExp = /^[a-zA-Z]+$/;
let phoneRegex : RegExp = /^(01[2,0,5,1])[0-9]{8}$/
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading! :boolean;
  errorMessage:string = '';


constructor(private _AuthService:AuthService,private _router:Router) {
  
}


registerForm : FormGroup = new FormGroup ({
  name :new FormControl(null,[Validators.required,Validators.minLength(3),Validators.pattern(nameRegex),Validators.maxLength(12)]),
  email :new FormControl(null,[Validators.required,Validators.email]),
  password :new FormControl(null,[Validators.required,Validators.pattern(passwordRegex)]),
  rePassword :new FormControl(null,[Validators.required]),
  phone :new FormControl(null,[Validators.required,Validators.pattern(phoneRegex)]),
},{validators: [this.matching]} as FormControlOptions )

registerSubmit(){
  this.isLoading=true;

  this._AuthService.signUpAPI(this.registerForm.value).subscribe({
    next: (res)=>{console.log(res);
    this.isLoading=false;
    this._router.navigate(['/login']);
    },

    error:(err)=>{this.errorMessage = err.error.message;
      this.isLoading=false;}
  })

 

}

matching(group:FormGroup){

  if(group.get('rePassword')?.value==''){
    group.get('rePassword')?.setErrors({required:true})
  }



  else if(group.get('password')?.value!=group.get('rePassword')?.value){
    group.get('rePassword')?.setErrors({matchingError:true})

  }

}


}

