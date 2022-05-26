import { EventEmitter, Injectable } from '@angular/core';
import { Comment } from '../model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  model: EventEmitter<{ action: string, data: any }>;
  url: string;

  constructor() {
    this.model = new EventEmitter();
    this.url = '/api/v1/comment';
  }

  list(filter?: { [key: string]: any }) {
    console.log('list', filter);
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

  update(comment: Comment) {
    fetch(`${this.url}/${comment.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
      .then(response => response.json())
      .then(response => this.model.emit({ action: 'update', data: response.data }))
      .catch(error => this.model.emit({ action: 'error', data: 'ERROR: on update acction' }));
  }

  create(comment: Comment) {
    fetch(this.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
      .then(response => response.json())
      .then(response => this.model.emit({ action: 'create', data: response.data }))
      .catch(error => this.model.emit({ action: 'error', data: 'ERROR: on create acction' }));
  }

  save(comment: Comment) {
    return comment.id ?
      this.update(comment) :
      this.create(comment);
  }

  delete(id: number) {
    fetch(`${this.url}/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(response => this.model.emit({ action: 'delete', data: response.data }))
      .catch(error => this.model.emit({ action: 'error', data: 'ERROR: on delete acction' }));
  }
}
