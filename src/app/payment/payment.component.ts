import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl, FormControlOptions } from '@angular/forms';
import { PaymentServiceService } from '../payment-service.service';
import { ActivatedRoute } from '@angular/router';


let addressRegex : RegExp =/^(\d+) ?([A-Za-z](?= ))? (.*?) ([^ ]+?) ?((?<= )APT)? ?((?<= )\d*)?$/;

let nameRegex : RegExp = /^[a-zA-Z]+$/;
let phoneRegex : RegExp = /^(01[2,0,5,1])[0-9]{8}$/
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})


export class PaymentComponent {

  constructor(private _PaymentServiceService:PaymentServiceService,private _ActivatedRoute:ActivatedRoute ){}

  id:string='';
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((par)=>{this.id=par['id'];
    console.log(this.id)
    })
  }

  isLoading:boolean=false;

  addressForm : FormGroup = new FormGroup ({
    details :new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern(addressRegex),Validators.maxLength(35)]),
    phone :new FormControl(null,[Validators.required,Validators.pattern(phoneRegex)]),
    city :new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
  })
  
  paySubmit(){
    this.isLoading=true;
  
    this._PaymentServiceService.onlinePaymentAPI(this.id,this.addressForm.value).subscribe({
      next: (res)=>{console.log(res);
      this.isLoading=false;
      localStorage.setItem('numInCart','0')
      window.open(res.session.url,'_self')
      },
  
      error:(err)=>{console.log(err);
        this.isLoading=false;}
    })
  
   
  
  }
  

  


}
