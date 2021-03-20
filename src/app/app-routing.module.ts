import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'countries', pathMatch: 'full' },
  { path: 'countries', component: HomePageComponent },
  { path: 'country/:countryName', component: CountryDetailsComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
