import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Location Clicked
  locationClicked(city: string): void {
    localStorage.setItem('CITY', city);
    this.router.navigate(['home']);
  }
}
