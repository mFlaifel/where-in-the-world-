import { CountryService } from './../../services/country.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from 'src/app/models/country';
import { Location } from '@angular/common';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent implements OnInit {
  countryName: string | null = '';
  isLoading = true;
  isError = false;
  errorMessage = '';
  countryData: Country = new Country();
  borderCountries: Country[] = [];

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private location: Location
  ) {
    this.route.paramMap.subscribe((params) => {
      this.countryData = new Country();
      this.isLoading = true;
      this.countryName = params.get('countryName');
      if (typeof this.countryName === 'string') {
        this.fetchCountryData(this.countryName);
      }
    });
  }

  ngOnInit(): void {
    if (window.history.state.name !== undefined) {
      this.countryData = this.modifyData(window.history.state);
      this.countryName = window.history.state.name;
      this.fetchBoarderCountries(window.history.state.name.boarders);
      this.isLoading = false;
    } else if (typeof this.countryName === 'string') {
      this.fetchCountryData(this.countryName);
    } else {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = `can't fetch data, please try again`;
    }
  }

  handleGoBack(): void {
    this.location.back();
  }

  fetchCountryData(countryName: string): void {
    this.countryService.getCountryByName(countryName).subscribe(
      (response: any) => {
        this.countryData = this.modifyData(response[0]);
        this.fetchBoarderCountries(response[0].borders);
      },
      (error) => {
        this.isLoading = false;
        this.isError = true;
        if (error.status === 404) {
          this.errorMessage = 'Sorry, no matching result';
        } else {
          this.errorMessage = 'Please, try again';
        }
      }
    );
  }

  fetchBoarderCountries(borders: string[]): void {
    if (borders?.length === 0 || borders === undefined) {
      this.isLoading = false;
      return;
    } else {
      this.countryService.getBorderCountries(borders).subscribe((res: any) => {
        this.borderCountries = res;
        this.isLoading = false;
      });
    }
  }

  modifyData(countryData: Country) {
    //get native name
    const nativeNameKey: string = Object.keys(countryData.name.nativeName)[0];
    countryData.name.nativeName =
      //@ts-ignore
      countryData.name.nativeName[nativeNameKey].official;
    //get currencies
    const currencyKeysArray: string[] = Object.keys(countryData.currencies);
    let currencies: [] = [];
    currencyKeysArray.forEach((e: string) => {
      //@ts-ignore
      const currency = countryData.currencies[e];
      //@ts-ignore
      currencies.push(currency);
    });
    //@ts-ignore
    countryData.currencies = currencies;

    //get languages
    const languageKeysArray: string[] = Object.keys(countryData.languages);
    let languages: [] = [];
    languageKeysArray.forEach((e: string) => {
      //@ts-ignore
      const language = countryData.languages[e];
      //@ts-ignore
      languages.push(language);
    });
    //@ts-ignore
    countryData.languages = languages;
    return countryData;
  }
}
