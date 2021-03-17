import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(public http: HttpClient) {}

  getAllCountries() {
    return this.http.get('http://restcountries.eu/rest/v2/all');
  }

  getCountriesByName(name: string) {
    return this.http.get(`http://restcountries.eu/rest/v2/name/${name}`);
  }
  getCountriesByRegion(region: string) {
    return this.http.get(`http://restcountries.eu/rest/v2/region/${region}`);
  }
}
