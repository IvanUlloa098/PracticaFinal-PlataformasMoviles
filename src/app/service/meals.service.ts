import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  price: any

  constructor(public afs: AngularFirestore, private http: HttpClient) { }

  getSearchResult(params: string)  {
    return this.http.get<any>(environment.WS_PATH + "/search.php?s=" + params).toPromise()
  }

  getCategories() {
    return this.http.get<any>(environment.WS_PATH + "/categories.php").toPromise()
  }

  getMealByCategory(category: string) {
    return this.http.get<any>(environment.WS_PATH + "/filter.php?c=" + category).toPromise()
  }

  getMealById(id: string) {
    return this.http.get<any>(environment.WS_PATH + "/lookup.php?i=" + id).toPromise()
  }

  getIngredients() {
    return this.http.get<any>(environment.WS_PATH + "/list.php?i=list").toPromise()
  }

  getPrices(): Observable<any[]> {
    return this.afs.collection("ingredients").valueChanges()
  }

  getPricesByID(id: string):Observable<any[]> {
    console.log("-------------------------------")
    return this.afs.collection("ingredients", 
                              ref => ref.where("idIngredient", "==", id )).valueChanges();
  }

}
