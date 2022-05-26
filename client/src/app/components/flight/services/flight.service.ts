import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  model: EventEmitter<{ action: string, data: any }>;
  url: string;

  constructor() {
    this.model = new EventEmitter();
    this.url = '/flight';
  }

  load() {
    this.model.emit({
      action: 'list', 
      data: [
        { id: 666, name: 'Fl Boots' },
        { id: 222, name: 'Fl Clogs' },
        { id: 111, name: 'Fl Loafers' },
        { id: 313, name: 'Fl London' },
        { id: 455, name: 'Fl Sneakers' },
        { id: 645, name: 'Fl Barcelona' },
        { id: 897, name: 'Fl NY' },
        { id: 357, name: 'Fl Havana' }
      ]
    });
    /*fetch(this.url)
      .then(response => response.json())
      .then(response => this.model.emit({ action: 'list', data: response.data }))
      .catch(error => this.model.emit({ action: 'error', data: 'Not loaded data' }));*/
  }

  select(id:number) {
    this.model.emit({
      action: 'select', data: { id: 666, name: 'Fl Boots' }
    });
  }
}
