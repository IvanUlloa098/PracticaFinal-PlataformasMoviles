import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { MealsService } from 'src/app/service/meals.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio-app',
  templateUrl: './inicio-app.page.html',
  styleUrls: ['./inicio-app.page.scss'],
})
export class InicioAppPage implements OnInit {

  public meals: any
  public mealsBackup: any
  public params: string

  public ingredients: any
  public ingredientsBackup: any

  constructor(private router: Router, private http: HttpClient, private firestore: AngularFirestore, private mealsService : MealsService) { }

  option = {
    slidesPerView: 2,
    centeredSlides: true,
    loop: true,
    spaceBetween: 5,
    // autoplay:true,
  }

  async ngOnInit() {
    this.meals = await this.initializeItems()
    this.ingredients = await this.initializeIngredientes()
  }

  async initializeIngredientes(): Promise<any> {
    
    //this.ingredients = contactos['meals'];
    var contactos: any
    var ingredientesBuscados = [];
    const listaIngredientes = (await this.mealsService.getIngredients())['meals']
    for (let i = 0; i < 10; i++) {
      var ingrediente = (1)+ Math.floor(Math.random() * (606))
      //console.log(listaIngredientes.strIngredient);
      for (var x of listaIngredientes) {
        if(x != null){
          if(x.idIngredient == ingrediente){
            ingredientesBuscados[i] = x
          }
        }else{
          i--;
        } 
      } 

    }
    return ingredientesBuscados;
  }

  async initializeItems(): Promise<any>{
    var contactos: any
    var listaRecetas = []; 
    for (let i = 0; i < 10; i++) {
      //limite superior: 53054
      //limite inferior: 52826
      var receta = (52826)+ Math.floor(Math.random() * (228)) 
      contactos = (await this.mealsService.getMealById(receta.toString()))['meals']
      if(contactos != null){
        //for (var x of contactos) {
        //  console.log(x.strMeal);
        //}
        listaRecetas[i] = contactos
      }else{
        i--;
      }
      
    }
    
    return listaRecetas
  }

  viewMeal(id: string) {
    let params: NavigationExtras = {
      queryParams: {
        id:id
      }
    }
    //console.log("id: ",id)
    this.router.navigate(['display-meal'], params)
  }

  concatURL(name) {
    let test = "https://www.themealdb.com/images/ingredients/"+name+".png"
    return test
  }

  viewIngredient(id: string) {
    let params: NavigationExtras = {
      queryParams: {
        id:id
      }
    }
    //console.log("id: ",id)
    this.router.navigate(['display-ingredient'], params)
  }
  
  errorImage() {
    console.log("IMG ERROR");
    return 'https://fussionaireyfuego.com/assets/archivos/sin_imagen.jpg'
  }
}
