import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MealsService } from 'src/app/service/meals.service';
import { ProvidersService } from 'src/app/service/providers.service';

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

  constructor(private activate: ActivatedRoute, private router: Router, private providersService: ProvidersService, private mealsService : MealsService) { 
    activate.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.id = this.router.getCurrentNavigation().extras.queryParams.id
      }
    })
  }

  async ngOnInit() {
    this.type = 'meal';
    this.meal = await this.initializeItems()
    //console.log(this.meal)
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

}
