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
    fetch(this.url + '?' + params)
      .then(response => response.json())
      .then(response => this.model.emit({ action: 'list', data: response.data.data }))
      .catch(error => this.model.emit({ action: 'error', data: 'Not loaded data' }));
  }

  select(id: number) {
    console.log('select', id);

    fetch(`${this.url}/${id}`)
      .then(response => response.json())
      .then(response => this.model.emit({ action: 'list', data: response.data }))
      .catch(error => this.model.emit({ action: 'error', data: 'Not loaded data' }));
  }

  update(comment: Comment) {
    console.log('update', comment);

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
    console.log('create', comment);

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
    console.log('save', comment);
    return comment.id ?
      this.update(comment) :
      this.create(comment);
  }

  delete(id: number) {
    console.log('delete', id);
    fetch(`${this.url}/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(response => this.model.emit({ action: 'delete', data: response.data }))
      .catch(error => this.model.emit({ action: 'error', data: 'ERROR: on delete acction' }));
  }
}
