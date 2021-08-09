import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { CartService } from 'src/app/service/cart.service';
import { MealsService } from 'src/app/service/meals.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Item } from 'src/app/domain/item';
import { Payment } from 'src/app/domain/payment';

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
  constructor(private router: Router, private cartservice: CartService, public alertController: AlertController){}

  ngOnInit() {
    this.listaDeComprasPorPagar = this.cartservice.getCarShopping();
    //console.log(this.listaDeComprasPorPagar)
    this.calcularSubtotal()
  }

  calcularSubtotal(){
    this.listaDeComprasPorPagar.subscribe(valores =>{
      valores.forEach(valor => {
        this.subtotal =  Number((this.subtotal +valor.amount).toFixed(2))
        this.iva = Number(((this.subtotal*12)/100).toFixed(2)); 
        this.taxes = Number(((this.subtotal*5)/100).toFixed(2)); 
        this.total = Number((this.subtotal+this.iva+this.taxes).toFixed(2))
      }); 
    });
  }

  
  guardarPago() {
    //this.cartservice.realizarPagoProductos();
    this.listaDeComprasPorPagar.subscribe(valores =>{
      valores.forEach(valor => {
        
        this.item = new Item() 
        this.item.id = valor.id
        this.item.idIngredient = valor.idIngredient
        this.item.units = valor.units
        this.item.amount = valor.amount 
        this.item.user = valor.user
        this.item.nameImageIngredient = valor.nameImageIngredient
        this.item.precioIngrediente = valor.precioIngrediente
        

        this.cartservice.confirmarPagoProductos(this.item)

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
    
    this.router.navigate([''])
    
  }
}
