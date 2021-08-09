import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";
import { Item } from 'src/app/domain/item';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CartService } from 'src/app/service/cart.service';
import { MealsService } from 'src/app/service/meals.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {

  listaDeComprasPorPagar: any
  ingredients: any
  idUser: string;



  constructor(public authservice : AuthenticationService,private router: Router, private mealsService : MealsService,  private cartservice: CartService) { }

  async ngOnInit() {
    //this.authservice.updateUserData;

    await this.authservice.getUserAuth().subscribe(
      user =>{
        //console.log("user: ------",user.email)
        this.idUser = user.email;
        console.log("this.idUser", this.idUser)
        this.listaDeComprasPorPagar = this.cartservice.getCarShopping(this.idUser);
        console.log(this.listaDeComprasPorPagar)
      }
    );

      

    
  }

  concatURL(name) {
    let test = "https://www.themealdb.com/images/ingredients/"+name+".png"
    return test
  }

  cancelarProducto(item: any){
    this.cartservice.eliminarIngredienteCompraCarrito(item);
  }

  realizarPago(){

    this.router.navigate(['location'])
    //this.router.navigate(['payment'])
  }

}
