import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MealsService } from 'src/app/service/meals.service';
import { AlertController, NavController } from '@ionic/angular'; 
import { Item } from 'src/app/domain/item';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-search-ingredients',
  templateUrl: './search-ingredients.page.html',
  styleUrls: ['./search-ingredients.page.scss'],
})

export class SearchIngredientsPage implements OnInit {

  ingredients: any
  ingredientsBackup: any

  prices: any
  item: Item 
  p: number

  constructor(private cartService: CartService, private alertCtrl: AlertController, private router: Router, private mealsService : MealsService) { }

  async ngOnInit() {
    await this.initializeItems()
    await this.mealsService.getPrices().subscribe(res => this.prices = res)
  }

  async initializeItems(): Promise<any> {
    const contactos = await this.mealsService.getIngredients()
    //this.ingredients = contactos['meals'];
    this.ingredientsBackup = contactos['meals'];
    return contactos['meals'];
  }


  concatURL(name) {
    let test = "https://www.themealdb.com/images/ingredients/"+name+".png"
    return test
  }

  async filterList(evt) {
     
    this.ingredients = this.ingredientsBackup;
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.ingredients = this.ingredients.filter(ref => {
      if (ref.strIngredient && searchTerm) {
        return (ref.strIngredient.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  async showPrompt(item: any) {  
    this.p = this.getPrice(item.idIngredient)

    const prompt = await this.alertCtrl.create({  
      header: 'Buy ingredient',  
      subHeader: item.strIngredient+" $"+this.p, 
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
              this.item.idIngredient = item.idIngredient
              this.item.units = data.amount
              this.item.amount = data.amount*this.p
              this.item.user = "testing"
              
              console.log(this.item)
              this.cartService.addToCart(this.item)
                  
            }
            console.log('Saved clicked');  
          }  
        }  
      ]  
    });  
    await prompt.present();  
  }  

  getPrice(id: string) {
    return this.prices.find(s => s.idIngredient === id).price
  }
}
