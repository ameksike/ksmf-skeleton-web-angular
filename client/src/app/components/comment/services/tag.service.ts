import { EventEmitter, Injectable } from '@angular/core';
import { EventService } from '../model/event.service.model';
import { Tag } from '../model/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  model: EventEmitter<EventService>;
  url: string;

  constructor() {
    this.model = new EventEmitter();
    this.url = '/api/v1/tag';
  }

  list(filter?: { [key: string]: any }) {
    const params = filter ? "filter=" + JSON.stringify(filter) : ''
    fetch(this.url + '?' + params, { method: 'GET' })
      .then(response => response.json())
      .then(response => this.model.emit({ action: 'list', data: response.data.data }))
      .catch(error => this.model.emit({ action: 'error', data: 'Not loaded data' }));
  }

  select(id: number) {
    fetch(`${this.url}/${id}`, { method: 'GET' })
      .then(response => response.json())
      .then(response => this.model.emit({ action: 'select', data: response.data }))
      .catch(error => this.model.emit({ action: 'error', data: 'Not loaded data' }));
  }

  update(tag: Tag) {
    fetch(`${this.url}/${tag.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tag)
    })
      .then(response => response.json())
      .then(response => this.model.emit({ action: 'update', data: response.data }))
      .catch(error => this.model.emit({ action: 'error', data: 'ERROR: on update acction' }));
  }

  create(tag: Tag): Promise<Tag> {
    return new Promise((resolve, reject) => {
      fetch(this.url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tag)
      })
        .then(response => response.json())
        .then(response => {
          this.model.emit({ action: 'create', data: response.data });
          resolve(response.data);
        })
        .catch(error => {
          this.model.emit({ action: 'error', data: 'ERROR: on create acction' })
          reject(error);
        });
    });
  }

  save(tag: Tag) {
    return tag.id ?
      this.update(tag) :
      this.create(tag);
  }

  delete(id: number) {
    fetch(`${this.url}/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(response => this.model.emit({ action: 'delete', data: response.data }))
      .catch(error => this.model.emit({ action: 'error', data: 'ERROR: on delete acction' }));
  }
}
