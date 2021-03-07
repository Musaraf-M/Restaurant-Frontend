import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';

interface RestaurantData {
  address: string;
  city: string;
  name: string;
  description: string;
  dishes: string[];
  createdAt: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // Location
  location: string;

  // Restaurant Data
  restaurants: RestaurantData[];
  filters: RestaurantData[];

  constructor(private router: Router, private api: ApiService, private auth: AuthService) {}

  // Search bar input
  public searchTerm: string = null;
  ngOnInit(): void {
    // get location
    this.getPrefferedLocation();

    // Get Restaurant Data
    this.getRestaurantData();
  }

  // Get preferred location
  getPrefferedLocation(): void {
    this.location = localStorage.getItem('CITY');
  }

  // Get Restaurant data based on location
  getRestaurantData(): void {
    this.api.getRestaurantData({ city: this.location }).subscribe((data) => {
      this.restaurants = data as RestaurantData[];
    });
  }

  // Change Location
  changeLocation(): void {
    this.router.navigate(['location']);
  }

  // Search filter
  filterItems(searchTerm): RestaurantData[] {
    return this.restaurants.filter((item) => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  //  Set filter 
  setFilteredItems(): void {
    this.filters = this.filterItems(this.searchTerm);
  }

  // Filter with cuisine
  GetselectedCuisine(selected_value_cuisine):void {
    if (selected_value_cuisine == 'all') {
      this.getRestaurantData();
    } else {
        this.api
          .getRestaurantData({ cuisine: selected_value_cuisine })
          .subscribe((data) => {
            this.restaurants = data as RestaurantData[];
          });
    }
  }

  // Filter with type
  GetselectedType(selected_value_type): void {
    if (selected_value_type == 'any') {
      this.getRestaurantData();
    } else {
      this.api
        .getRestaurantData({ restaurantType: selected_value_type })
        .subscribe((data) => {
          this.restaurants = data as RestaurantData[];
        });
    }
  }

  // Page navigation on restaurant detail
  restautantDetailNav(data): void{
    localStorage.setItem('RESTAURANT', data);
    this.router.navigate(['restaurant-detail']);
  }

  // Log user out
  logout(): void{
    this.auth.removeToken();
    this.router.navigate(['login']);
  }
}
