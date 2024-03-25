import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-varify-code',
  templateUrl: './varify-code.component.html',
  styleUrls: ['./varify-code.component.css']
})
export class VarifyCodeComponent {

  /**
   *
   */
  constructor(private _AuthService:AuthService,private _router:Router) {
    
  }

  notValidCode:boolean = false;
  isLoading:boolean = false;
  varifyCodeMethod(){
    this.isLoading=true
this._AuthService.varifyCodeApi(this.varifyCodeForm.value).subscribe({
  next: (res)=>{console.log(res)
  this.isLoading=false;
    this._router.navigate(['resetPassword'])
},
  error: (err)=>{console.log(err)
    this.notValidCode=true;
    this.isLoading=false;
  }
})
  }


  varifyCodeForm : FormGroup=new FormGroup({
    resetCode:new FormControl(null,[Validators.required]),

    
  })


}
