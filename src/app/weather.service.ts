import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'Api key (quitada por el git)';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=-33.5&lon=-70.6167&appid=API KEY (TAMBIEN QUITADA Xd)&units=metric&lang=es';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=es`;
    return this.http.get(url);
  }
}
