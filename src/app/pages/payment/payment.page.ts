import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { CartService } from 'src/app/service/cart.service';
import { MealsService } from 'src/app/service/meals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Item } from 'src/app/domain/item';
import { Payment } from 'src/app/domain/payment';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  listaDeComprasPorPagar: any
  subtotal: number = 0
  iva: number = 0
  taxes: number = 0
  total: number = 0
  item: Item;
  pago: Payment;
  deliveryFee : number
  idUser: string = ""
  idcart: string


  constructor(public authservice : AuthenticationService,private route: ActivatedRoute, private router: Router, private cartservice: CartService, public alertController: AlertController){
    route.queryParams.subscribe(params =>{
      console.log(params)
      //Para parametros constantes
      //this.contacto = params.contacto;
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.deliveryFee = this.router.getCurrentNavigation().extras.queryParams.deliveryFee;
        this.deliveryFee  = Number((this.deliveryFee).toFixed(2))
      }
    })
  }

  async ngOnInit() {
    this.authservice.updateUserData;

    await this.authservice.getUserAuth().subscribe(
      user =>{
        this.idUser = user.email;
        this.listaDeComprasPorPagar = this.cartservice.getCarShopping(this.idUser);
        this.calcularSubtotal()
      }
    );
    
    //console.log(this.listaDeComprasPorPagar)
    
  }

  calcularSubtotal(){
    this.listaDeComprasPorPagar.subscribe(valores =>{
      valores.forEach(valor => {
        this.subtotal =  Number((this.subtotal +valor.amount).toFixed(2))
        this.iva = Number(((this.subtotal*12)/100).toFixed(2)); 
        this.taxes = Number(((this.subtotal*5)/100).toFixed(2)); 
        this.total = Number((this.subtotal+this.iva+this.taxes+this.deliveryFee).toFixed(2))
      }); 
    });
  }

  
  guardarPago() {
    //this.cartservice.realizarPagoProductos();

    
    this.listaDeComprasPorPagar.subscribe(valores =>{
      valores.forEach(valor => {
//        this.idcart = valor.id
        this.cartservice.confirmarPagoProductos(valor)
        this.pago = new Payment();
        this.pago.idCart = valor.id
        this.pago.subtotal =  this.subtotal
        this.pago.iva = this.iva
        this.pago.taxes = this.taxes
        this.pago.total = this.total
        this.pago.pagado = true
        this.cartservice.realizarPagoProductos(this.pago)
      
      }); 

      

    });

  
    const alert = this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Thanks for using Fresh Now',
      message: 'Your payment has been generated',
      buttons: ['ACCEPT']
    });
    
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(["tabs"]);

    
  }
}
