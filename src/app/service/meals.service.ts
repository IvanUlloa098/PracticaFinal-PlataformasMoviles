import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor(private http: HttpClient) { }

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

}
