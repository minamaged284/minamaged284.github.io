import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from './auth.service';
export const loggedGuardGuard: CanActivateFn = (route, state) => {


  let _Router : Router= inject(Router);
  let _Authdervice : AuthService = inject(AuthService)
  
    if(localStorage.getItem('uToken')==null){
      return true;
    }
    else{
      
      _Authdervice.saveUserData();
      _Router.navigate(['/home']);
      return false}
};







