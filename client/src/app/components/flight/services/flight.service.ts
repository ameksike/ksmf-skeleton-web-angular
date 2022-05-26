import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  model: EventEmitter<{ action: string, data: any }>;
  url: string;

  constructor() {
    this.model = new EventEmitter();
    this.url = '/api/v1/flight';
  }

  load() {
    fetch(this.url)
      .then(response => response.json())
      .then(response => this.model.emit({ action: 'list', data: response.data }))
      .catch(error => this.model.emit({ action: 'error', data: 'Not loaded data' }));
  }

  select(id:number) {
    this.model.emit({
      action: 'select', data: { id: 666, name: 'Fl Boots' }
    });
  }
}
