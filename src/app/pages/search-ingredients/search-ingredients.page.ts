import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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

  showPrompt(id: string) {  
    let params: NavigationExtras = {
      queryParams: {
        id:id
      }
    }
    //console.log("id: ",id)
    this.router.navigate(['display-ingredient'], params)
  }  

  getPrice(id: string) {
    return this.prices.find(s => s.idIngredient === id).price
  }
}
