import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { LocationService } from 'src/app/service/location.service';
import { Address } from 'src/app/domain/address';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})

export class LocationPage implements OnInit {

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  locations: any
  newAdress: Address
  saveFlag: boolean = true

  // DISTAMCE AND PRICING
  distance: number
  deliveryFee: number = 2.0

  @ViewChild('search')
  public searchElementRef: ElementRef;

  icons = {
    client: "https://cdn1.iconfinder.com/data/icons/ecommerce-61/48/eccomerce_-_location-48.png"
  };

  idUser: string


  constructor(private router: Router,public authservice : AuthenticationService, private locationService: LocationService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  async ngOnInit() {
    this.authservice.updateUserData;

    await this.authservice.getUserAuth().subscribe(
      user =>{
        this.idUser = user.email;
        this.locationService.getLocations(this.idUser).subscribe(res => {
          try {
            this.locations = res;
          } catch (error) { }
        })
      }
    );
    


    

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);

        const place = new google.maps.LatLng(this.latitude, this.longitude);
        this.calculateDistance(place)
      });
    }
  }


  markerDragEnd($event: google.maps.MouseEvent) {
    this.latitude = $event.latLng.lat()
    this.longitude = $event.latLng.lng()
    this.getAddress(this.latitude, this.longitude);

    const place = new google.maps.LatLng(this.latitude, this.longitude);
    this.calculateDistance(place)

    this.saveFlag = true
    console.log(this.saveFlag)
  }

  saveLocation(){

    if(this.newAdress == undefined && this.saveFlag == true){
      this.newAdress = new Address()
      this.newAdress.latitude = this.latitude
      this.newAdress.longitude = this.longitude
      this.newAdress.name = this.address
      this.newAdress.user = this.idUser

      this.locationService.saveLocation(this.newAdress)
      console.log("saved")
    } else {
      console.log("navigate without saving")
    }
    let params: NavigationExtras = {
      queryParams: {
        deliveryFee: this.deliveryFee
      }
    }
    this.router.navigate(['payment'], params)
  }

  setLocation(item: any){
    this.latitude = item.latitude
    this.longitude = item.longitude
    this.getAddress(this.latitude, this.longitude)

    this.saveFlag = false
    console.log(this.saveFlag)
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  calculateDistance(coor) {
    const supply = new google.maps.LatLng(-2.886336223860531, -78.98985764502314);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(supply, coor);
    this.distance = distance

    if(distance>4000){
      this.deliveryFee = 2.0+((distance-4000)*0.00013)
    } else {
      this.deliveryFee = 2.0
    }

    console.log("Distance: "+distance+"   Fee: $"+this.deliveryFee)
    
    
  }

}
