import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealsService } from 'src/app/service/meals.service';

@Component({
  selector: 'app-meal-category',
  templateUrl: './meal-category.page.html',
  styleUrls: ['./meal-category.page.scss'],
})
export class MealCategoryPage implements OnInit {

  public meals : any
  public mealsBackup: any
  
  category: string

  constructor(private activate: ActivatedRoute, private router: Router, private mealsService : MealsService) { 
    activate.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.category = this.router.getCurrentNavigation().extras.queryParams.category
      }
    })
  }

  async ngOnInit() {
    this.meals = await this.initializeItems()
  }

  async initializeItems(): Promise<any> {
    const contactos = await this.mealsService.getMealByCategory(this.category)
    
    this.mealsBackup = contactos['meals'];
    return contactos['meals'];
  }

  async filterList(evt) {
    this.meals = this.mealsBackup;
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  
    this.meals = this.meals.filter(ref => {
      if (ref.strMeal && searchTerm) {
        return (ref.strMeal.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

}
