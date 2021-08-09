import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit {

  name : string;
  email: String;
  verif : Boolean;
  photo : String;
  id : string;
  constructor(public authservice : AuthenticationService) { }

  ngOnInit() {
    this.authservice.updateUserData;

    this.authservice.getUserAuth().subscribe(
      user =>{
        this.name = user.displayName;
        this.email = user.email;
        this.verif = user.emailVerified;
        this.photo = user.photoURL;
        this.id = user.uid;
        
        console.log( 'ho----adfadfa', user);
      }
      );
  
    
  }

  
  
  Onlogout(){
    this.authservice.salirCuenta();
  }
}
