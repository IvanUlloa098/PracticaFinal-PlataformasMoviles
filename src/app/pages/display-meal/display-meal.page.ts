import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Comment } from 'src/app/domain/comment';
import { Item } from 'src/app/domain/item';
import { CartService } from 'src/app/service/cart.service';
import { FeedbackService } from 'src/app/service/feedback.service';
import { MealsService } from 'src/app/service/meals.service';
import { ProvidersService } from 'src/app/service/providers.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-display-meal',
  templateUrl: './display-meal.page.html',
  styleUrls: ['./display-meal.page.scss'],
})
export class DisplayMealPage implements OnInit {

  aux: any
  type: string;
  id: string
  meal: any
  mealBackup: any
  ingredients: any
  prices: any
  item: Item

  comment: Comment = new Comment()
  comments: any

  p: number
  n: string

  constructor(private datePipe: DatePipe, private feedbackService: FeedbackService, private alertCtrl: AlertController, private cartService: CartService, private activate: ActivatedRoute, private router: Router, private providersService: ProvidersService, private mealsService : MealsService) { 
    activate.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.id = this.router.getCurrentNavigation().extras.queryParams.id
      }
    })
  }

  async ngOnInit() {
    this.type = 'meal';
    this.meal = await this.initializeItems()
    this.ingredients = await this.mealsService.getIngredients()
    await this.feedbackService.getComments(this.id).subscribe(res => this.comments = res)
    await this.mealsService.getPrices().subscribe(res => this.prices = res)
    //await this.providersService.fillPrices()
    
  }

  async initializeItems(): Promise<any> {
    const meals = await this.mealsService.getMealById(this.id)
    return meals['meals'];
  }

  goCategories(item: string) {
    let params: NavigationExtras = {
      queryParams: {
        category:item
      }
    }
    
    this.router.navigate(['meal-category'], params)
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  concatURL(name) {
    let test = "https://www.themealdb.com/images/ingredients/"+name+".png"
    return console.log(test)
  }

  getIngredient(name: string) {
    return this.ingredients['meals'].find(s => s.strIngredient === name).idIngredient
  }

  getPrice(id: string) {
    return this.prices.find(s => s.idIngredient === id).price
  }

  newComment() {
    let date = new Date()

    this.comment.user = "testing"
    this.comment.idMeal = this.id
    this.comment.date = this.datePipe.transform(date,"yyyy-MM-dd").toString()

    this.feedbackService.addComment(this.comment)
    this.comment.comment = ""
    console.log(this.comment)
  }

  async showPrompt(name: string) {  

    this.n = this.getIngredient(name)
    this.p = this.getPrice(this.n)

    const prompt = await this.alertCtrl.create({  
      header: 'Buy ingredient',  
      subHeader: name+" $"+this.p,
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
              this.item.idIngredient = this.n
              this.item.units = data.amount
              this.item.amount = data.amount*this.p
              this.item.user = "testing"
              
              //console.log(this.item.idIngredient)
              //console.log(name)
              this.cartService.addToCart(this.item)
                  
            }
            console.log('Saved clicked');  
          }  
        }  
      ]  
    });  
    await prompt.present();  
  }

  async allConfirm() {
    const prompt = await this.alertCtrl.create({  
      header: 'Confirm',  
      message: 'Add all the ingredients to your cart?',  
      buttons: [  
        {  
          text: 'Cancel',  
          handler: data => {  
            console.log('Cancel clicked');  
          }  
        },  
        {  
          text: 'Accept',  
          handler: async data => {  
            this.addAllIngredients()
            console.log('Saved clicked');  
          }  
        }  
      ]  
    });  
    await prompt.present();
  }

  addAllIngredients() {
    
    if(this.meal[0].strIngredient1 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient1)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient2 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient2)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }
    
    if(this.meal[0].strIngredient3 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient3)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient4 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient4)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient5 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient5)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient6 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient6)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient7 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient7)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient8 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient8)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient9 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient9)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient10 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient10)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient11 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient11)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient12 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient12)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient13 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient13)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient14 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient14)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient15 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient15)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient16 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient16)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient17 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient17)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient18 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient18)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient19 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient19)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }

    if(this.meal[0].strIngredient20 != "") {
      this.n = this.getIngredient(this.meal[0].strIngredient20)
      this.p = this.getPrice(this.n)

      this.item = new Item() 
      this.item.idIngredient = this.n
      this.item.units = 1
      this.item.amount = this.p
      this.item.user = "testing"
      
      this.cartService.addToCart(this.item)
    }
    
  }

}
