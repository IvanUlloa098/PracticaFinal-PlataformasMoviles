import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from 'src/app/service/feedback.service';
import { MealsService } from 'src/app/service/meals.service';
import { AlertController } from '@ionic/angular';
import { Item } from 'src/app/domain/item';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-display-ingredient',
  templateUrl: './display-ingredient.page.html',
  styleUrls: ['./display-ingredient.page.scss'],
})
export class DisplayIngredientPage implements OnInit {

  id: string
  ingredients: any
  ingredientsFireBase: any
  idIngrediente: string
  nameIngredient: string
  descriptionIngredient: string
  priceIngredient: string
  prices: any
  public ingrediente : any
  precioIngrediente: number
  item: Item

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private mealsService : MealsService, 
              public alertController: AlertController,
              private cartService: CartService) { 
    
    
                route.queryParams.subscribe(params =>{
                  console.log(params)
                  //Para parametros constantes
                  //this.contacto = params.contacto;
                  if(this.router.getCurrentNavigation().extras.queryParams){
                    this.id = this.router.getCurrentNavigation().extras.queryParams.id;
                    console.log("ESte id: ",this.id);
                  }
                })
  }

  async ngOnInit() {
    this.ingredients = await this.mealsService.getIngredients();
    
    this.prices = this.mealsService.getPrices().subscribe(valores  => {
      valores.forEach(valor => {
        if(valor.idIngredient == this.id){
          //console.log(valor);
          this.priceIngredient = valor.price
        }
        
      }); 
    });
                    

    this.ingrediente = await this.getIngredient(this.id)
    this.idIngrediente = this.ingrediente.idIngredient
    this.descriptionIngredient = this.ingrediente.strDescription
    this.nameIngredient = this.ingrediente.strIngredient
   
    
  }

  getIngredient(id: string) {
    var ingredient = this.ingredients['meals'].find(s => s.idIngredient == id)
    return ingredient
  }

  concatURL(name) {
    let test = "https://www.themealdb.com/images/ingredients/"+name+".png"
    return test
  }

  getPrice(id: string) {
    console.log(this.prices)
    
    for (var x of this.prices) {
      console.log(x);
    }

    return this.prices.find(s => s.idIngredient === id).price
  }

  goToBuyNow(){
    this.router.navigate(['shopping-cart'])
  }

  async addToCart(idIngrediente: string, priceIngredient: string){
    //console.log("id: ", idIngrediente, " price: ", priceIngredient)
    var precioProducto = Number(priceIngredient)
    console.log("id: ", idIngrediente, " price: ", precioProducto)
    const alert = await this.alertController.create({
      header: 'BUY INGREDIENT',  
      subHeader: "Ingredient: "+this.nameIngredient+", Price:  $"+precioProducto,
      message: 'Enter the amount you need',  
      inputs: [  
        {  
          name: 'amount',          
          placeholder: 'Your amount...' ,
          type: 'number',
          value: 1
           
        },  
      ],  
      buttons: [  
        {  
          text: 'Cancel',  
          handler: data => {  
            console.log('Cancel clicked');  
          }  
        },  
        {  
          text: 'Buy',  
          handler: async data => {  
            if(data.amount) { 
              this.item = new Item() 
              this.item.idIngredient = idIngrediente
              this.item.units = data.amount
              this.item.amount = data.amount*precioProducto
              this.item.user = "testing-v2"
              this.item.nameImageIngredient = this.nameIngredient
              this.item.precioIngrediente = precioProducto
              //console.log(this.item.idIngredient)
              //console.log(name)
              this.cartService.addToCart(this.item)
                 
            }
            console.log('Saved clicked');  
          }  
        }  
      ]  
    });  
    await alert.present();

    //const { role } = await alert.onDidDismiss();
    //console.log('onDidDismiss resolved with role', role);


  }

}
