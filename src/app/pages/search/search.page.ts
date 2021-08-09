import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { MealsService } from 'src/app/service/meals.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public meals : any
  public mealsBackup: any

  public params: string

  constructor(private router: Router, private http: HttpClient, private firestore: AngularFirestore, private mealsService : MealsService) { }

  async ngOnInit() {
    this.meals = await this.initializeItems()
  }

  async initializeItems(): Promise<any> {
    const contactos = await this.mealsService.getMealById(this.params)
    
    this.mealsBackup = contactos['meals'];
    return contactos['meals'];
  }

  async filterList(evt) {
    this.meals = this.mealsBackup;
    const searchTerm = evt.srcElement.value;
    this.params = searchTerm;

    if (!searchTerm) {
      return;
    }

    this.meals = await this.mealsService.getSearchResult(this.params)
    this.meals = this.meals['meals']

  }

  toCategories() {
    this.router.navigate(['category'])
  }

  toIngredients() {
    this.router.navigate(['search-ingredients'])
  }

  toDisplay(id: string) {
    let params: NavigationExtras = {
      queryParams: {
        id:id
      }
    }
    
    this.router.navigate(['display-meal'], params)
  }

}
