import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(public http: HttpClient) {}

  getAllCountries() {
    return this.http.get('https://restcountries.com/v3.1/all');
  }

  getCountriesByName(name: string) {
    return this.http.get(`https://restcountries.com/v3.1/name/${name}`);
  }
  getCountriesByRegion(region: string) {
    return this.http.get(`https://restcountries.com/v3.1/region/${region}`);
  }

  getCountryByName(name: string) {
    return this.http.get(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`
    );
  }

  getBorderCountries(borderCountriesArray: string[]) {
    return this.http.get(
      `https://restcountries.com/v3.1/alpha?codes=${borderCountriesArray.join(
        ','
      )}`
    );
  }
}
