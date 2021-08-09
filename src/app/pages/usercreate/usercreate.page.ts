import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/domain/user';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
  selector: 'app-usercreate',
  templateUrl: './usercreate.page.html',
  styleUrls: ['./usercreate.page.scss'],
})
export class UsercreatePage implements OnInit {

  User : User = new User();
  ID: any;

  constructor(private router: Router, private auth: AuthenticationService  ) { }

  ngOnInit() {
  }

  async registro(){
    const user = await this.auth.onRegistro(this.User);

    if(user){
      this.ID = this.auth.verificacion();
      console.log(" ES EL ID (EMAL)",  this.ID);

      this.auth.save(this.User);
      console.log("exito de registro ");
      this.router.navigate(["/login"])

    }else{
      console.log("error en registro")
    }
  }

  regresar(){
    this.router.navigate(["/login"])
  }


}
