import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';

interface RestaurantData {
  address: string;
  city: string;
  name: string;
  description: string;
  dishes: string[];
  createdAt: string;
}

interface DishData {
  cuisine: string;
  type: string;
  name: string;
  description: string;
  restaurant: String[];
  createdAt: string;
}

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
})
export class RestaurantDetailPage implements OnInit {

  restaurantID: string;

  details: RestaurantData;

  dishes: DishData;

  lists: number[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.restaurantID = localStorage.getItem('RESTAURANT');
    this.getDetails(this.restaurantID);
    this.getMenu(this.restaurantID);
  }

  async getDetails(value): Promise<void> {
    this.api
        .getRestaurantData({ _id: value })
        .subscribe((data) => {
          this.details = data[0] as RestaurantData;
        });
  }

  async getMenu(value): Promise<void> {
    this.api
        .getDishData({ restaurant: value })
        .subscribe((data) => {
          this.dishes = data as DishData;
          this.getCost(this.dishes, value);
        });
  }

  getCost(data, Id: string): void{
    data.forEach(element => {
      element.restaurant.forEach((res) => {
        if (res.id === Id) {
          let temp = res.cost
          this.lists.push(temp);
        }
      });
    });
  }
}
