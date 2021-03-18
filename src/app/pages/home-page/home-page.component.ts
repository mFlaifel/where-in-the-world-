import { CountryService } from './../../services/country.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private countryService: CountryService) {}
  isLoading = true;
  isError = false;
  errorMessage = '';
  regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  countriesData: any[] = [];
  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe((response: any) => {
      this.isLoading = false;
      this.countriesData = response;
    });
  }
  handleSearch(event: any): void {
    this.isLoading = true;
    this.isError = false;
    this.countriesData = [];
    this.countryService.getCountriesByName(event.target.value).subscribe(
      (response: any) => {
        this.countriesData = response;
      },
      (error) => {
        this.isLoading = false;
        this.isError = true;
        if (error.status === 404) {
          this.errorMessage = 'Sorry,no matching result for your search';
        } else {
          this.errorMessage = 'Please, try again';
        }
      }
    );
  }
  handleFilterCountries(region: string): void {
    this.isLoading = true;
    this.isError = false;
    this.countriesData = [];
    this.countryService.getCountriesByRegion(region).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.countriesData = response;
      },
      () => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = 'Please, try again';
      }
    );
  }
}
