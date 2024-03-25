import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';


export const authGuardGuard: CanActivateFn = (route, state) => {
let _Router : Router= inject(Router);
let _Authdervice : AuthService = inject(AuthService)

  if(localStorage.getItem('uToken')==null){
  _Router.navigate(['/login'])
    return false;
  }
  else{
    
    _Authdervice.saveUserData();
    return true}
}


