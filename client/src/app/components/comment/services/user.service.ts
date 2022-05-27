import { EventEmitter, Injectable } from '@angular/core';
import { EventService } from '../model/event.service.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  model: EventEmitter<EventService>;
  url: string;

  constructor() {
    this.model = new EventEmitter();
    this.url = '/api/v1/user';
  }

  list() {
    fetch(this.url)
      .then(response => response.json())
      .then(response => this.model.emit({ action: 'list', data: response.data.data }))
      .catch(error => this.model.emit({ action: 'error', data: 'Not loaded data' }));
  }
}
