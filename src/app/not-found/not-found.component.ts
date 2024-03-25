import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFOundComponent {
  constructor(private _AuthService:AuthService){}
ngOnInit(): void {
  console.log(localStorage.getItem('uToken'))
  console.log(this._AuthService.userToken)
}
}
