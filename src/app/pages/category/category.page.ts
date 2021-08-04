import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { MealsService } from 'src/app/service/meals.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  public categories : any
  public categoriesBackup: any

  constructor(private router: Router, private http: HttpClient, private firestore: AngularFirestore, private mealsService : MealsService) { }

  async ngOnInit() {
    this.categories = await this.initializeItems()
  }

  async initializeItems(): Promise<any> {
    const contactos = await this.mealsService.getCategories()
    
    this.categoriesBackup = contactos['categories'];
    return contactos['categories'];
  }

  goCategories(item: string) {
    let params: NavigationExtras = {
      queryParams: {
        category:item
      }
    }
    
    this.router.navigate(['meal-category'], params)
  }

}
